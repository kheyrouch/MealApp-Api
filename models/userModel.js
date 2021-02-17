const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'please add a name'],
        minlength: 4,
    },
    email: {
        type: String,
        required: [true, 'please add an email'],
        unique: [true, 'this email exists'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    phoneNumber: {
        type: String,
        minlength: 8,
        required: [true, 'please add a phone number'],
        match: [
            /^(00213|\+213|0)(5|6|7)[0-9]{8}$/,
            'please add a valid phone number'
        ]
    },
    address: {
        type: String,
        required: [true, 'please add an adresse']
    },
    password: {
        type: String,
        required: [true, 'please add password'],
        minlength: 8,
        select: false
    }
})

userSchema.pre('save', async function(next){
    // generate salt
    const salt = await bcrypt.genSalt(10);
    // hash password
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

module.exports = mongoose.model('User', userSchema);