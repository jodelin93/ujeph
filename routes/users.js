const express = require("express");
const path = require("path")
const User= require("../controllers/User");
const router = express.Router();

router.get("/register",User.getRegisterPage);
router.post("/postUser",User.postUser);
router.post("/updatetUser/:username",User.updatetUser);
router.get("/table_users",User.getUsers);
router.get("/table_users/:username",User.delUser);
router.get("/edit_user/:username",User.editUser);



module.exports= router;