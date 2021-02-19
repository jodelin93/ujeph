const { render } = require("ejs");
const express = require("express");
const path = require("path")
const Faculte= require("../controllers/Faculte");
const router = express.Router();


router.get("/register_faculte",Faculte.registerFaculte);
router.post("/postFaculte",Faculte.postFaculte);
router.get("/table_facultes",Faculte.getFacultes);
router.get("/edit_faculte/:code",Faculte.editFaculte);
router.post("/edit_faculte/:code",Faculte.editFacultePost);





module.exports= router;