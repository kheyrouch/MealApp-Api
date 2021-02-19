//Third Party middlewares
const morgan = require('morgan');
const express = require ('express');

// Routers
const userRouter = require('./routers/userRouter');

//ErrorHandling
const errorHandler = require('./errors/errorHandler')
module.exports = [
    express.json(),
    morgan('dev'),
    userRouter,
    errorHandler
];