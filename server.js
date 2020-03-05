const express = require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
//load the environmetn variable file
require('dotenv').config({path:"./config/keys.env"});


const app = express();
//Handlebars middleware(This tells Express to set handlebars as the template engine)
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(express.static("public/img"));

 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));


//load controllers
const generalController = require("./controllers/general");
const productController = require("./controllers/product");

//map each controller to the app object

app.use("/", generalController);
app.use("/",productController);


//sets up server

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log('Web Server is up and running');
});