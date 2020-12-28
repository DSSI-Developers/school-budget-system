const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();

const users = require('./routes/users');
const config = require('./config/database');

// Config database
mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

mongoose.connection.on('error', () => {
    console.log('Cannot connect to database');
});

// Port
const port = 3000;

// Cors Middle ware
app.use(cors());

// Set static path 
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middle ware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Route users
app.use('/users', users);

// Index route
app.get('/', (req, res) => {
    res.send('Hello Back - end');
    res.end();
});



// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});