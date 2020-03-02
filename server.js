const express = require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
//load the environmetn variable file
require('dotenv').config({path:"./config/keys.env"});


const app = express();
//Handlebars middleware(This tells Express to set handlebars as the template engine)
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

//load controllers
const generalController = require("./controllers/general");
const productController = require("./controllers/product");

//map each controller to the app object

/*  
     localhost:3000/
     localhost:3000/contact-us
     localhost:3000/product/list
     localhost:3000/product/add
     localhost:3000/product/delete
     localhost:3000/product/103030

      localhost:3000/room/adds
      localhost:3000/room/edit
      localhost:3000/room/delete



*/
app.use("/", generalController);
app.use("/product",productController);


//sets up server

const PORT = process.env.PORT;
app.listen(PORT,()=>{

    console.log('Web Server is up and running');
});