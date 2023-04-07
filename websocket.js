
const models = require('./models');
const config = require('./services/config');
const AWS = require('aws-sdk');
let webSocketCategories = [];
const successFullResponse = {
    statusCode: 200,
    body: 'Success'
}


const failedResponse = (statusCode, error) => ({
    statusCode,
    body: error
})

const getCurrentLenderModels = async () => {
    try {
        const appDetails = await config.getDbDetails({ headers: { lenderid: '' } });
        if (webSocketCategories.length === 0 && appDetails.webSocketCategories && appDetails.webSocketCategories.length > 0) {
            webSocketCategories = appDetails.webSocketCategories;
            console.log('webSocketCategories', webSocketCategories, typeof webSocketCategories)
        }
        process.env['dbName'] = process.env['webSocketDb'];
        const allModels = await models.allModels();
        return allModels[process.env['dbName']];
    } catch (error) {
        throw error;
    }
}

const connectHandler = async (event, context, callback) => {
    try {
        if (!event.queryStringParameters) {
            throw new Error('Bad Request')
        }
        const { type } = event.queryStringParameters;
        if (type === 'server') {
            return callback(null, successFullResponse);
        } else {
            const { userId, lender } = event.queryStringParameters;
            if (!userId || !lender) {
                throw new Error('Bad Request')
            }
            const connectionId = event.requestContext.connectionId;
            console.log('user connected', connectionId);
            if (userId && lender) {
                const currentLenderModels = await getCurrentLenderModels();
                await currentLenderModels.models.socketConnections.create({ lender, userId, connectionId });
                await currentLenderModels.models.socketConnectionLogs.create({ connectionId, lender: lender, userId: userId, status: 1 });
                await currentLenderModels.connectionManager.close();
                return callback(null, successFullResponse);
            }
        }
        callback(null, failedResponse(400, 'Bad Request'));
    } catch (error) {
        console.log(error);
        callback(null, failedResponse(500, error.message || 'There is error'));
    }
}


const disconnectHandler = async (event, context, callback) => {
    try {
        const connectionId = event.requestContext.connectionId;
        console.log('disconnected connectionId : ', connectionId);
        const currentLenderModels = await getCurrentLenderModels();
        const currentConnection = (await currentLenderModels.models.socketConnections.findOne({ where: { connectionId } })).toJSON();
        await currentLenderModels.models.socketConnections.destroy({ where: { connectionId } });
        await currentLenderModels.models.socketConnectionLogs.create({ connectionId, lender: currentConnection.lender, userId: currentConnection.userId, status: 0 });
        await currentLenderModels.connectionManager.close();
        callback(null, successFullResponse);
    } catch (error) {
        callback(null, failedResponse(500, error.message || 'There is error'));
    }
}

const sendMessageToUser = async (body) => {
    try {
        const { userId, lender, category } = body;
        const message = body.message || 'Notification Changed';
        const currentLenderModels = await getCurrentLenderModels();
        console.log('category : ', category, ' webSocketCategories : ', webSocketCategories)
        if (!category) {
            throw new Error('category is required');
        }
        if (!webSocketCategories.includes(category)) {
            throw new Error('category is not matched');
        }
        console.log('data', userId, lender);
        const connectionData = await currentLenderModels.models.socketConnections.findAll({ where: { userId, lender } });
        const connectionIds = connectionData.map(x => x.toJSON().connectionId);
        if (connectionData.length > 0) {
            let endpoint = process.env['webSocketUrl'];
            const apigwManagementApi = new AWS.ApiGatewayManagementApi({
                apiVersion: '2018-11-29',
                endpoint: endpoint
            })
            const socketPostPromises = connectionIds.map((connectionId) => {
                const params = {
                    ConnectionId: connectionId,
                    Data: JSON.stringify({ message, category })
                }
                return apigwManagementApi.postToConnection(params).promise();
            });
            const promiseRes = await Promise.allSettled(socketPostPromises);
            console.log('promiseRes', promiseRes)
            const rejectedConnectionIds = [];
            promiseRes.forEach(async (x, index) => {
                if (x.status === 'rejected') {
                    const connectionId = connectionIds[index];
                    rejectedConnectionIds.push(connectionId);
                    await apigwManagementApi.deleteConnection({ ConnectionId: connectionId }).promise().catch((err) => { });
                }
            });
            if (rejectedConnectionIds.length > 0) {
                await currentLenderModels.models.socketConnections.destroy({ where: { connectionId: rejectedConnectionIds } });
                const createData = rejectedConnectionIds.map(x => {
                    /** @type {0|1} */
                    const status = 0;
                    return { connectionId: x, lender: lender, userId: userId, status }
                })
                await currentLenderModels.models.socketConnectionLogs.bulkCreate(createData);
            }

        }
        await currentLenderModels.connectionManager.close();
    } catch (error) {
        throw error;
    }
}


module.exports.handler = async (event, context, callback) => {
    console.log('event', event)
    if (event.socketServerRequest) {
        try {
            await sendMessageToUser(event);
            callback(null, successFullResponse);
        } catch (error) {
            callback(null, failedResponse(500, error.message || 'There is error'));
        }
        return callback(null, failedResponse(400, 'Bad request'));
    }
    const { requestContext: { routeKey } } = event;
    if (routeKey === "$connect") {
        return await connectHandler(event, context, callback);
    }

    if (routeKey === "$disconnect") {
        return await disconnectHandler(event, context, callback);
    }

    // if (routeKey === "$default") {
    //     return await defaultHandler(event, context, callback);
    // }
    callback(null, failedResponse(404, "routeKey is not matched"));
}