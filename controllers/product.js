const express = require('express')
const router = express.Router();

//load prodcutModel
const prodcutModel = require("../models/product")


//localhost:3000/product/list
//contact us route
router.get("/list",(req,res)=>{
    res.render("products/productList",{
        title:"product Listing Page",
        products: prodcutModel.getAllProducts()
    });
});

//show add product form
router.get("/add",(req,res)=>{
    res.render("products/productAdd",{
        title:"product Add Form"
    });
});

//When user submit form
router.post("/add",(req,res)=>{
    res.render();
});

module.exports = router;