
const appConfig = require('./services/config');

/**
 * @param {number} emailLimit
 */
async function startJobForLender(emailLimit) {
    try {
        const EmailJob = require('./jobs/emailJob');
        // await appConfig.getDbDetails({ headers: { lenderid: dbName } });
        return await EmailJob(emailLimit);
    } catch (error) {
        throw error;
    }
}

// module.exports.handler = async (event, context, callback = null) => {
//     if (event.lenderid) {
//         process.env['dbName'] = event.lenderid;
//     } else {
//         throw "Invalid Lender";
//     }
//     const EmailJob = require('./jobs/emailJob');
//     await appConfig.getDbDetails({ headers: { lenderid: event.lenderid } });
//     EmailJob();
// }


async function start() {
    try {
        await appConfig.getDbDetails({ headers: { lenderid: '' } });
        /** @type {number} */
        let emailLimit = +process.env['emailLimit'] || 100;
        const models = require('./models');
        const adminSequelize = await models.initSequelize(process.env['adminDbName']);
        const adminModelDefiner = require('./models/lender.model');
        adminModelDefiner(adminSequelize);
        const { models: model } = adminSequelize;
        let lenders = (await model.lender.findAll({ order: [['id', 'desc']] })).map(x => x.toJSON());
        let dbNames = lenders.map(x => x['db_name']);
        if(process.env['commonDB']) {
            console.log('commonDB', process.env['commonDB'])
            if(!dbNames.includes(process.env['commonDB'])) {
                console.log('set commonDB', process.env['commonDB'])
                dbNames.push(process.env['commonDB']);
            }
        }
        console.log('totalLenders', lenders.length);
        // if(lenders.length > 0) {
        //     await appConfig.getDbDetails({ headers: { lenderid: lenders[0]['db_name'] } });
        // }
        adminSequelize.connectionManager.close();
        // close connection;
        for (let i = 0; i < dbNames.length; i++) {
            const dbName = dbNames[i]
            if (dbName) {
                try {
                    console.log('dbName', dbName + '_logs')
                    process.env['dbName'] = dbName + '_logs';
                    const sendedEmail = await startJobForLender(emailLimit);
                    console.log('sendedEmail', sendedEmail)
                    console.log('BEFORE emailLimit ', emailLimit)
                    emailLimit = emailLimit - sendedEmail;
                    console.log('After emailLimit ', emailLimit)
                    if (emailLimit <= 0) {
                        console.log('break Executed on i=' + i);
                        break;
                    }
                } catch (error) {
                    console.log('job error', error);
                }
            }
        }
    } catch (error) {
        console.log("TRY ERROR");
        console.log(error);
        throw error;
    }

}

module.exports.handler = async (event, context, callback = null) => {
    try {
        console.log('START FUNCTION HERE 2');
        await start();
        console.log('END');
    } catch (error) {
        console.log('ERROR');
        console.log(error);
    }
}

// start();