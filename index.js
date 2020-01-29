const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const categeorieRouter = require('./routes/categories');
const loginRouter = require('./routes/login');
const docsRouter = require('./routes/docs');
const cors = require('cors');
const conf = require('./config');
const expressJwt = require('express-jwt');

app.use(cors());
app.options('*', cors());
app.use(expressJwt({secret: conf.jwtSecret}).unless({path: [/auth/g]}));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(8080);

app.use('/cat', categeorieRouter);
app.use('/auth', loginRouter);
app.use('/docs', docsRouter);

module.exports = app;
