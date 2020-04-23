const express = require('express')
const router = express.Router();

const prodcutModel = require("../models/product")

router.get("/",(req,res)=>{
    res.render("general/home",{
        title:"Home Page",
        bestPro: prodcutModel.getBestSellPro()
    });
});

//contact us route
router.get("/registration",(req,res)=>{
    res.render("general/registration",{
        title:"ContactUs Page",
    });
});

//Process contact us form for when 
router.post("/registration",(req,res)=>{

    const erroMessages = [];
   
    if(req.body.name=="" || ( req.body.email=="" && req.body.email !="/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/") ||
      (req.body.password==""&& req.body.password != "/^[A-Za-z]\w{7,14}$/")){ 
            erroMessages.push("You must put valid value!!!!");
    }
    
    if(erroMessages.length > 0){
            res.render("general/registration",{
                    title : "Customer Registration",
                    errors : erroMessages
            });

    }
    else{
        const {name,email,password} = req.body;
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
        const msg = {
            to: req.body.email,
            from: `${email}`,
            subject: `Registration Form Submit`,
            html:
            `visitor's Full Name : ${name} <br>
             Visitor's Email Address : ${email} <br>
            `,
        };
        //Asynchronous operation(who don't know how long  this will take to execute)
        sgMail.send(msg)
        .then(()=>{
            res.redirect("/");
        })
        .catch(err=>{
            console.log(`Error ${err}`);
        });
    }

});

   router.get("/login",(req,res)=>{
    res.render("general/login",{
            title : "login",
    });
});


router.post("/login",(req,res)=>{
    const loginerroMsg = [];
    
    if(req.body.logemail=="" || req.body.logpsw==""){
        loginerroMsg .push("This field is required!!!");
    }
    if(loginerroMsg.length > 0){
            res.render("general/login",{
                    title : "Login",
                    logerrors : loginerroMsg
            });

    }
    else{
        const {logemail,logpassword} = req.body;
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
        const msg = {
            to: `${logemail}`,
            from: `violetds0826@gmail.com`,
            subject: `Login Form Submit`,
            html:
            `
             Visitor's Email Address : ${logemail} <br>
             Visitor's Email Address : ${logpassword} <br>
            `,
        };
        //Asynchronous operation(who don't know how long  this will take to execute)
        sgMail.send(msg)
        .then(()=>{
            res.redirect("/");
        })
        .catch(err=>{
            console.log(`Error ${err}`);
        });
    }
});


module.exports = router;