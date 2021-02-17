const express = require("express");
const dotenv = require('dotenv');
const mongoose = require('mongoose');


//import middlewares
const middlewares = require('./middlewares/middleware');

// dotenv configuration 
dotenv.config({ path: `${__dirname}/config/config.env`});

// import env variables
const PORT = process.env.PORT || 4000;

// create express application
const app = express();

//add third party middlewares
app.use(...middlewares);
// // connect to the database
// mongoose.connect(`${process.env.MONGODB_URI}`,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true

// })
//     .then(        //Lunching the server
//         app.listen(PORT, function (){
//             console.log(`app listening on port ${PORT}`);
//         }))
//     .catch( err => console.error(err) );

app.listen(PORT, function (){
    console.log(`app listening on port ${PORT}`);
})

app.get('/', (req,res)=>{
    res.send("ok");
})