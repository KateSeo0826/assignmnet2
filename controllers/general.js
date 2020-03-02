const express = require('express')
const router = express.Router();



router.get("/",(req,res)=>{
    res.render("general/home",{
        title:"Home Page"
    });
});

//contact us route
router.get("/contact-us",(req,res)=>{
    res.render("general/contactUs",{
        title:"ContactUs Page",
    });
});

//Process contact us form for when 
router.post("/contact-us",(req,res)=>{
   const {firstName,lastName,email,message} = req.body;
   const sgMail = require('@sendgrid/mail');
   sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
   const msg = {
       to: `violetds0826@gmail.com`,
       from: `${email}`,
       subject: `Contact Us Form Submit`,
       html:
       `visitor's Full Name : ${firstName} ${lastName} <br>
        Visitor's Email Address : ${email} <br>
        Visitor's message : ${message} <br>
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
});


module.exports = router;