const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
dotenv.config();
const app = express();
const passport = require('passport');
const path = require('path');
const config = require('./config/database');

const http = require('http')
const socketIO = require('socket.io');

const server = http.createServer(app);
const io = socketIO(server);
app.set('io', io);

//  Middleware
app.use(cors());
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

// Midleware  authentication 
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// Static folder 
app.use(express.static(path.join(__dirname, 'public')));

// Connect database 
mongoose.connect(
    config.database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true,
    }
).then(() => {
    console.log('Connected Database');
})

mongoose.connection.on('error', (err) => {
    console.log('Cannot connected to database');
});

// Realtime data
// io.on('connection', function(socket) {
//     socket.on('newdata', function(data) {
//         io.emit('new-data', { data: data });
//     });
//     socket.on('updatedata', function(data) {
//         io.emit('update-data', { data: data });
//     });
// });

const usersRouter = require('./routes/users');
const mainEquipments = require('./routes/main-equipments');
const notification = require('./routes/notification');
const metaEquipment = require('./routes/meta-equipments');
const learningGroup = require('./routes/learningGroup');
const subEquipments = require('./routes/sub-equipments');
const { Server } = require('http');
app.get('/', (req, res) => {
    res.json({ message: "Welcome to my site" });
});

// Router 
app.use('/users', usersRouter);
app.use('/mainEquipment', mainEquipments);
app.use('/subEquipment', subEquipments);
app.use('/notification', notification);
app.use('/metaEquipments', metaEquipment);
app.use('/learningGroup', learningGroup);
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server is runing at http://localhost:${port}`);
});