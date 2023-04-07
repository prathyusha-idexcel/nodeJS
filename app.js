const serverless = require("serverless-http");
const appConfig = require('./services/config');


module.exports.handler = async (event, context) => {
    try {
        console.log('*** event Request ****', event, '\n', " EVENT BODY : ", event.body);
        // const configDetails = await appConfig.getDbDetails(event)
        await appConfig.getDbDetails(event)
        const app = require('./appEntry');
        // const allModels = await models.allModels();
        const handler = serverless(app);
        const result = await handler(event, context);
        return result;
    } catch (error) {
        console.log(' *** App Handler Error ERROR *** ', error);
    }

};