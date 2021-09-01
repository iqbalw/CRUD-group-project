// Imports
require('dotenv').config(); // Configure environment variables
const express = require('express');
const routes = require('./routes/startup/initRoutes');
const path = require('path');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', 'views');

// Init Routes
routes(app);

// 404, If request not found
app.use((req, res) => {
    res.status(404).send('Sorry, Request Not found.');
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server Listening at Port: ${port}`));