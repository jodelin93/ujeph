const { render } = require("ejs");
const express = require("express");
const path = require("path")
const User= require("../controllers/User");
const router = express.Router();
const auth = require("../config/auth");

router.get("/register",auth,User.getRegisterPage);
router.post("/postUser",auth,User.postUser);
router.post("/updatetUser/:username",auth,User.updatetUser);
router.get("/table_users",auth,User.getUsers);
router.get("/table_users/:username",auth,User.delUser);
router.get("/edit_user/:username",auth,User.editUser);




module.exports= router;