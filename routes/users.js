const express = require("express");
const path = require("path")

const router = express.Router();

router.get("/register",(req,res,next)=>{
    res.render("register");
})




module.exports= router;