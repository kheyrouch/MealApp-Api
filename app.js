const express = require("express");
const dotenv = require('dotenv');
const mongoose = require('mongoose');


//import middlewares
const middlewares = require('./middleware');

//import Error class
const BaseError = require('./errors/ErrorsClass');

// dotenv configuration 
dotenv.config({ path: `${__dirname}/config/config.env`});

// import env variables
const PORT = process.env.PORT || 4000;

// create express application
const app = express();

//add third party middlewares
app.use(...middlewares);

// //error Handling 
// app.use((err, req, res, next) => {
//     const { message, code } = err;
//     if ( err instanceof BaseError ) {
//         res.status(code).json({
//             success: false,
//             err: message
//         })
//     }
// })

// connect to the database
mongoose.connect(`${process.env.MONGODB_URI}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true

},(err) => {
    if(err) console.error(err) 
    else {
        app.listen(PORT, function (){
            console.log(`app listening on port ${PORT}`);
        })
    }
});


app.get('/', (req,res)=>{
    res.send("ok");
})