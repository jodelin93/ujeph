const express = require("express");
const path = require("path")
const User= require("../controllers/User");
const router = express.Router();

router.get("/register",User.getRegisterPage);
router.post("/postUser",User.postUser);
router.get("/table_users",User.getUsers);




module.exports= router;