const appConfig = require('./services/config');

async function startApp() {
    await appConfig.getDbDetails({})
    const app = require('./appEntry');

    app.listen(3000, () => {
        console.log('working')
    })
}

startApp()
