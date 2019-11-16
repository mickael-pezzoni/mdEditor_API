const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const categeorieRouter = require('./routes/categories');
const loginRouter = require('./routes/login');
const docsRouter = require('./routes/docs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(8080);

app.use('/cat', categeorieRouter);
app.use('/login', loginRouter);
app.use('/docs', docsRouter);

module.exports = app;