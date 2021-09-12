// Imports
require('dotenv').config(); // Configure environment variables
const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('./startup/configPassport')(passport); // Init Passport strategies
const routes = require('./startup/initRoutes');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', 'views');

// Init Session
app.use(session({ 
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false,
}));

// Init Passport
app.use(passport.initialize());
app.use(passport.session());

// Init Routes
routes(app);

//Connecting to the database
mongoose.connect(process.env.DB_CONNECT, 
    {useNewURLParser: true},
   ()=> console.log("Database connection was successful")
   );

// 404, If request not found
app.use((req, res) => {
    res.status(404).send('Sorry, Request Not found.');
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server Listening at Port: ${port}`));