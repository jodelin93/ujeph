const { render } = require("ejs");
const express = require("express");
const path = require("path")
const Faculte= require("../controllers/Faculte");
const router = express.Router();
const auth = require("../config/auth");

router.get("/register_faculte",auth,Faculte.registerFaculte);
router.post("/postFaculte",auth,Faculte.postFaculte);
router.get("/table_facultes",auth,Faculte.getFacultes);
router.get("/edit_faculte/:code",auth,Faculte.editFaculte);
router.post("/edit_faculte/:code",auth,Faculte.editFacultePost);





module.exports= router;