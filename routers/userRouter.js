const express = require('express');
const userRouter = express.Router()

const {
    postUserValidatorRole,
    deleteUserValidatorRole,
    loginValidatorRole,
    errorValidator,
    patchValidatorRole
} = require('../middlewares/userValidators');

const {
    createUser,
    deleteUser,
    login,
    modifieUser
} = require('../controllers/userController'); 

userRouter
    .route('/user')
        .post(postUserValidatorRole(), errorValidator, createUser)
        .delete(deleteUserValidatorRole(), errorValidator, deleteUser)
        .patch(patchValidatorRole(), errorValidator, modifieUser)
userRouter
    .route('/user/login').post(loginValidatorRole(), errorValidator, login);

module.exports = userRouter;

