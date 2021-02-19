const User = require('../models/userModel');

const { body, validationResult } = require('express-validator');

exports.postUserValidatorRole = () => {
    return[
        body('email').normalizeEmail()
            .exists().withMessage('Email Required')
            .isEmail().withMessage('Invalid Email Format'),
        body('name').isString()
            .exists({checkNull: true}).withMessage('Name Required')
            .isLength({min: 4}).withMessage('Name must be longer than 4 characters'),
        body('adresse')
        .   exists({checkNull: true}).withMessage('Adresse Required')
            .isLength({min: 4}).withMessage('Adresse must be longer than 8 characters'),
        body('phoneNumber')
            .exists({checkNull: true}).withMessage('Phone Number Required')
            .isLength({ min: 10, max: 10}).withMessage('please insert a valid phone number'),
        body('password').isString()
            .exists({checkNull: true}).withMessage('password Required')
            .isLength({ min: 5}).withMessage('Password must be longer than 8 characters')
    ]
}

exports.deleteUserValidatorRole = () => {
    return[
        body('email').normalizeEmail()
            .exists().withMessage('Email Required')
            .isEmail().withMessage('Invalid Email Format'),
        body('token').isJWT().withMessage('insert a valid token'),
        body('password').isString()
        .exists({checkNull: true}).withMessage('password Required')
    ]
}

exports.loginValidatorRole = () => {
    return [
        body('email').normalizeEmail()
            .exists().withMessage('Email Required')
            .isEmail().withMessage('Invalid Email Format'),
        body('password')
            .exists({checkNull: true}).withMessage('password Required')
    ]
}

exports.patchValidatorRole = () => {
    return[
        body('email').normalizeEmail()
            .exists().withMessage('Email Required')
            .isEmail().withMessage('Invalid Email Format'),
        body('name').isString()
            .exists({checkNull: true}).withMessage('Name Required')
            .isLength({min: 4}).withMessage('Name must be longer than 4 characters'),
        body('adresse')
        .   exists({checkNull: true}).withMessage('Adresse Required')
            .isLength({min: 4}).withMessage('Adresse must be longer than 8 characters'),
        body('phoneNumber')
            .exists({checkNull: true}).withMessage('Phone Number Required')
            .isLength({ min: 10, max: 10}).withMessage('please insert a valid phone number'),
        body('password').isString().withMessage('password must ne a string')
            .exists({checkNull: true}).withMessage('password Required')
            .isLength({ min: 5}).withMessage('Password must be longer than 8 characters'),
        body('token').isJWT().withMessage('insert a valid token')
    ]
}
exports.errorValidator = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(411).json({
          succuss: false,
          error: errors.array()[0].msg
        });
    }
    next();

}
