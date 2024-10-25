const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const ejsMate = require("ejs-mate");

router.get("/contact",(req,res) =>{
    res.render("users/contact.ejs");
});

router.get("/about",(req,res) =>{
    res.render("users/about.ejs");
});

router.get("/privacy",(req,res) =>{
    res.render("users/privacy.ejs");
});

router.get("/terms",(req,res) =>{
    res.render("users/terms.ejs");
});

router.get("/registration",(req,res) =>{
    res.render("users/registration.ejs");
});



router.get("/signup",(req,res) =>{
    res.render("users/signup.ejs");
});

router.post("/signup",async(req,res) =>{
    try{
        let {username,email,password} = req.body;
    const newUser = new User({email,username,});
    const registeredUser = await User.register(newUser,password);
    console.log(registeredUser );
    req.login(registeredUser,(err) =>{
        if(err){
            return next(err);
        }
        req.flash("success","welcome ");
        res.redirect(res.locals.redirectUrl);
    });
   }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
     }
});

router.get("/login",(req,res) =>{
    res.render("users/login.ejs");
});

router.post("/login",
    saveRedirectUrl,
    passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),
async(req,res)=>{
req.flash("success","welcome ");
let redirectUrl = res.locals.redirectUrl || "/listings";
res.redirect(redirectUrl);
});

router.get("/logout",(req,res,next) =>{
    req.logout((err) => {
if(err){
    next(err);
}
req.flash("success","you are logged out");
res.redirect("/listings");
    })
})
module.exports = router;


