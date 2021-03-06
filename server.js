'use strict';


const express = require('express');
const mongoose = require('mongoose');
const Promise = require('bluebird');

const userRoute = require('./route/user-route');
const dbRoute = require('./route/db-route');
const movieRoute = require('./route/movie-route');
const reviewRouter = require('./route/review-route');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/devMidtermTest';

mongoose.Promise = Promise;//tells mongoose to promisify everything
mongoose.connect(MONGODB_URI);

const app = express();

app.use(userRoute);
app.use(dbRoute);
app.use(movieRoute);
app.use(reviewRouter);

app.use(function(err, req, res, next){
  if(!err.status){
    return res.status(500).send('server error');
  }
  else {
    res.status(err.status).send(err.message).end(); //has to be here even if we're not nexting anything
    next();
  }
}); //can be written as app.use(errorMiddleware) if we want to modularize the code more


const server = module.exports = app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});

server.isRunning = true; //setup for testing ability to toggle on/off in before block
