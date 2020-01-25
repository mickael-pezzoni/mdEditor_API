const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const categeorieRouter = require('./routes/categories');
const loginRouter = require('./routes/login');
const docsRouter = require('./routes/docs');
const cors = require('cors');

const jwt = require('express-jwt');


/* app.use(jwt({
    secret: 'mickapezzoni',
    requestProperty: 'auth/signin',
    getToken: function fromHeaderOrQuerystring(req) {
        console.log(req.headers.authorization);
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;s    
        }
        return null;
    }
}).unless({path: [/auth/g]})); */

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(8080);

app.use('/cat', categeorieRouter);
app.use('/auth', loginRouter);
app.use('/docs', docsRouter);

module.exports = app;
