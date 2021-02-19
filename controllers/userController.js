const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/userModel');
const BaseError = require('../errors/ErrorsClass');



exports.createUser = async (req, res, next) => {
    const {
        email,
        name,
        adresse,
        phoneNumber,
        password
    } = req.body;

    const user = await User.findOne({ email: email});
    if (user){
        return(
            next(
                new BaseError("Email already used ", 411)
            )
        )
    }

    // const token = jwt.sign({email: email}, process.env.JWT_KEY);
    const token = createToken({ email });
    
    try {
        await User.create({name, email, adresse, phoneNumber, password});
    } catch (err) {
        console.log(err)
        return(
            next(
                new BaseError("Server Error", 500)
            )
        )
    }


    res.status(201).json({
        succuss: true,
        msg: 'user created',
        token
    })

    
}

exports.deleteUser = async (req, res, next) => {
    const { email, password, token } = req.body;
    const user = User.findOne({ email: email }).select('email password');

    if(!verifyToken(token)) {
        return(
            next(
                new BaseError("you must login", 403)
            )
        )
    }

    if(!user){
        return(
            next(
                new BaseError("user doesn't exist", 404)
            )
        )
    }

    const matchPassword = await verifyPassword(password, user.password);
    if(matchPassword){
        return(
            next(
                new BaseError("wrong password", 403)
            )
        )
    }

    try {
        await User.deleteOne({ email });
    } catch (error) {
        console.log(error);
        return(
            next(
                new BaseError("Server Error", 500)
            )
        )
    }

    res.status(200).json({
        success: true,
        msg: "user deleted"
    })
}

exports.modifieUser = async (req, res, next) => {
    let { name, email, password, adresse, phoneNumber, token} = req.body;

    let user = await User.findOne({ email: email});
    if (!user){
        return(
            next(
                new BaseError("User doesn't exist ", 404)
            )
        )
    }

    if(!verifyToken(token)) {
        return(
            next(
                new BaseError("you must login", 403)
            )
        )
    }

        // generate salt
    const salt = await bcrypt.genSalt(10);
    // hash password
    password = await bcrypt.hash(password, salt);
    
    user = await User.findByIdAndUpdate(user._id,{
        email, password, name, adresse, phoneNumber
    } )

    res.status(200).json({
        succuss: true,
        msg: "user data updated with success"
    })


}

exports.login = async (req, res, next) => {
    const { email , password } = req.body;
    
    const user = await User.findOne({email: email}).select('email password');

    if(!user){
        return(
            next(
                new BaseError("User doesn't exist", 404)
            )
        )
    }

    console.log(password);
    console.log(user);

    try {
        const result = await user.verifyPassword(password);
        console.log(result);
        if(!result) {
        return(
            next(
                new BaseError("wrong password", 403)
            )
        )
    }
    } catch (error) {
        console.log(error);
        return(
            next(
                new BaseError("Server Error", 500)
            )
        )
    }
    const token = createToken({email: email});
    res.status(200).json({
        succuss: true,
        msg: 'Login avec success',
        token,
    })


}



const createToken = (payload, options = null) => {
    return jwt.sign(payload, process.env.JWT_KEY, options);
}

const verifyToken = (token, options = null) => {
    return jwt.verify(token, process.env.JWT_KEY, options)
}