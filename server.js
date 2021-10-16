// Imports
require('dotenv').config(); // Configure environment variables
const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('./startup/configPassport')(passport); // Init Passport strategies
const routes = require('./startup/initRoutes');
const path = require('path');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const database = require('./startup/database');

const app = express();

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
//Allows users to add static files in the public directory
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', 'views');

// Init Session
app.use(session({ 
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false,
    unset: 'destroy',
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 // one day
    },
    store: MongoStore.create({
        mongoUrl: process.env.DB_CONNECT,
        ttl: 24 * 60 * 60, // one day
        autoRemove: 'native',
        stringify: false
    })
}));

// Init Passport
app.use(passport.initialize());
app.use(passport.session());

const getDurationInMilliseconds  = (start) => {
    const NS_PER_SEC = 1e9
    const NS_TO_MS = 1e6
    const diff = process.hrtime(start)

    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
}
//for testing purposes only 
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl} [STARTED]`)
    const start = process.hrtime()

    res.on('finish', () => {            
        const durationInMilliseconds = getDurationInMilliseconds (start)
        console.log(`${req.method} ${req.originalUrl} [FINISHED] ${durationInMilliseconds.toLocaleString()} ms`)
    })

    res.on('close', () => {
        const durationInMilliseconds = getDurationInMilliseconds (start)
        console.log(`${req.method} ${req.originalUrl} [CLOSED] ${durationInMilliseconds.toLocaleString()} ms`)
    })

    next()
})

// Init Routes
routes(app);

// 404, If request not found
app.use((req, res) => {
    //console.log(req.originalUrl);
    res.status(404).json('Sorry, Request Not found.');
});

const port = process.env.PORT || 3000;

database.connect().then(() => {
    app.listen(port, () => console.log(`Server Listening at Port: ${port}`));
})

module.exports = app;