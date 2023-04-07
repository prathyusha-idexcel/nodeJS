const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const EmailRouter = require('./routers/emailNotification.router');

app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json({ limit: '4mb' }));

// middleware to split /v1/ and make route
app.use((req, res, next) => {
  const url = req.url;
  const url2 = url.split('/v1/');
  if (url2.length === 2) {
    req.url = `/v1/${url2[1]}`;
  }
  next();
});

app.use('/v1/notifications', EmailRouter);

app.use((req, res, next) => {
  console.log('*** Route not found ***', req.url)
  res.status(404).json({ message: 'Route not found' });
});

app.use((error, req, res, next) => {
  let status = 500;
  if (error.status) {
    status = error.status;
  }
  console.log('*** APP Entry ERROR Handler ****', error);
  res.status(status).json({ message: error.message || 'There is error' });
})


module.exports = app;
