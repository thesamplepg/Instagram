const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const keys = require('./keys');
const { connectDB } = require('./utils/database');
const accountsApi = require('./api/accountsApi');
const postsApi = require('./api/postsApi');
const fs = require('fs');

const app = express();


app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: keys.session,
    saveUninitialized: true,
    resave: false,
    store: new MemoryStore({
        checkPeriod: 86400000
    })
}));
app.use('/static/', express.static(__dirname + '/client/static'))

connectDB(() => {

    console.log('-----------------------------');
    console.log('-----------------------------');
    console.log('__[ Has connected to DB ]__');

    app.use('/api/accounts', accountsApi);
    app.use('/api/posts', postsApi);

    const port = process.env.PORT || 5000;

    app.listen(port, () => {
        console.log('__[ Server has started ]__');
        console.log('-----------------------------');
        console.log('-----------------------------');
    });

});







