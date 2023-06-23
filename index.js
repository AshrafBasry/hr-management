const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const uri = process.env.MONGO_URI;


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const DBconn = mongoose.connection;
DBconn.on('error', (error) => console.error(error));
DBconn.once('open', () => console.info('Connection to Database is successful'));

const indexRouter = require('./routes/index'); 
const app = express();

app.set('port', process.env.SERVER_PORT);
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', indexRouter);

app.listen(process.env.SERVER_PORT, function () {
  console.log("Server is running on localhost3000");
});

module.exports = app;