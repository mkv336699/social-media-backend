var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
const mongoose = require('mongoose');
const cors = require("cors");

const port = 5000;

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

/** Mongo Configuration */
app.db = mongoose.createConnection('mongodb://127.0.0.1:27017/test');

/** Mongo Connection Error */
app.db.on('error', async (error) => {
  console.log('Error connecting to mongoose', error);
});

/** Mongo connected successfully */
app.db.once('open', () => {
  app.locals.gfs = new mongoose.mongo.GridFSBucket(app.db, {
    bucketName: 'uploads'
  });
  console.log('Mongo Db connected!');
});

app.use('/', indexRouter);

module.exports = app;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})