const express = require('express');
const { body, validationResult } = require('express-validator');
const userRouter = express.Router()

const {
    postUserValidator,
    postUserValidatorRole
} = require('../middlewares/userValidators')

userRouter
    .route('/user')
    .post(postUserValidatorRole(), postUserValidator, (req, res) => {
        res.json({
            succuss: true
        })
    })

module.exports = userRouter;

