const express = require('express')
const router = express.Router();

//load prodcutModel
const prodcutModel = require("../models/product")

router.get("/products",(req,res)=>{
    res.render("products/products",{
        title:"product Listing Page",
        products: prodcutModel.getAllProducts()

    });
});

module.exports = router;