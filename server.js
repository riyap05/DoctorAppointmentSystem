//using express we are creating rest APIs
//Express 
/* npm i express morgan //package Name(morgan : console pe route ka end point aur kitne time mai execute hua hai woh batayega)*/
// colors dotenv nodemon //baar baar server to restart nahi karna padega mongoose jsonwebtoken

const express = require('express') //express ko initialize kiya, import kiya
const colors=require('colors')
const morgan = require('morgan')
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const path = require('path');
//const cors=require('cors');

//dotenv config
dotenv.config();

//mongodb connection
connectDB();

//rest object create karna hai
const app=express() //express ke sare features app obj mai aa jayenge
//app.use(cors());

//middlewares
app.use(express.json()); //to not have parsing related error, body ke anadr json obj add kare toh error dekhne mil sakta hai
app.use(morgan('dev'));

//routes 
app.use('/api/v1/user',require('./routes/userRoutes'));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use('/api/v1/doctor',require("./routes/doctorRoutes"));

//static files
app.use(express.static(path.join(__dirname, "./client/build")));

app.get('*', function(req,res){
  res.sendFile(path.join(__dirname,"./client/build/index.html"));
});


// port
const port = process.env.PORT || 8001;

//listen port
app.listen(port, () => {
    /*console.log(
      `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
        .bgCyan.white
    );*/
  });

