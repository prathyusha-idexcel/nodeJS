
const { Umzug, SequelizeStorage } = require('umzug');
const appConfig = require('./services/config');
const models = require('./models');

async function runMigration(lender) {
  console.log('migration starting for lender =====> ', lender.db_name);
  const { Sequelize } = require('sequelize');
  const { Umzug, SequelizeStorage } = require('umzug');
  var sequelize;
  const fs = require('fs');
  if (process.env['envName'] != 'development') {
    const rdsCa = fs.readFileSync(__dirname + '/rds-combined-ca-bundle.pem');

    sequelize = new Sequelize(lender.db_name, process.env['dbUsername'], process.env['dbPassword'], {
      dialect: 'mysql',
      host: process.env['dbHost'],
      dialectOptions: {
        ssl: {
          rejectUnauthorized: true,
          ca: [rdsCa]
        }
      }
    });

  } else {
    console.log(lender.db_name, 'dbname')
    sequelize = new Sequelize(lender.db_name, process.env['dbUsername'], process.env['dbPassword'], {
      dialect: 'mysql',
      host: process.env['dbHost'],
      dialectOptions: {}
    });

  }
  console.log('se', sequelize)
  const umzug = new Umzug({
    migrations: {

      path: './migrations',
      params: [
        sequelize.getQueryInterface()
      ]
    },
    storage: new SequelizeStorage({ sequelize })
  });



  // Checks migrations and run them if they are not already applied. To keep
  // track of the executed migrations, a table (and sequelize model) called SequelizeMeta
  // will be automatically created (if it doesn't exist already) and parsed.
  console.log('before_executing migration');
  await umzug.up();
  console.log('done with migration');
}



const start = async (event, context) => {
  console.log("loading migration");
  const fs = require('fs');
  const rdsCa = fs.readFileSync('./rds-combined-ca-bundle.pem');
  let dla = {};
  if (process.env["envName"] !== 'development') {
    dla = { ssl: { rejectUnauthorized: true, ca: [rdsCa] } };
  }
  const dbDetails = await appConfig.getDbDetails({ headers: { lenderid: '' } });
  const { Sequelize } = require('sequelize');
  console.log('adminModelDefiner started');

  const adminSequelize = new Sequelize(process.env["adminDbName"], process.env["dbUsername"], process.env["dbPassword"], {
    dialect: 'mysql',
    host: process.env["dbHost"],
    dialectOptions: dla
  });
  console.log('adminModelDefiner created');
  const adminModelDefiner = require('./models/lender.model');
  adminModelDefiner(adminSequelize);

  const { models: model } = adminSequelize;
  console.log(model)
  try {
    // const lenders = await model.lender.findAll({ order: [['id', 'desc']] });
    const lenders = [{db_name:'mysqlall'}]
    console.log('lenders', lenders)
    for (let i = 0; i < lenders.length; i++) {
      await runMigration(lenders[i]);
    }
    console.log("done with migration");
  } catch (error) {
    console.log(error)
  }


};

module.exports.handler = async (event, context, callback) => {
  await start(event, context)
}

start();