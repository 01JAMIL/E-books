var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload')
// .env file configiration
require('dotenv').config();


const bookRouter = require('./routes/book.route');
const authorRouter = require('./routes/author.route');
const userRouter = require('./routes/user.route');

var app = express();

app.use(fileUpload({
    createParentPath: true
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Connect with mongo data base
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Data base connected successfully'))
    .catch((err) => console.log('Error ', err.message));

// Use routes 
app.use('/api/book', bookRouter);
app.use('/api/author', authorRouter);
app.use('/api/user', userRouter);

// use the upload folder to get images 
app.use('/uploads', express.static(
    path.join(__dirname, '/uploads')
))
module.exports = app;
