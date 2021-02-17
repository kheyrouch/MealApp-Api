//Third Party middlewares
const morgan = require('morgan');
const express = require ('express');

// Routers
const userRouter = require('../routers/userRouter');

module.exports = [
    express.json(),
    morgan('dev'),
    userRouter
];