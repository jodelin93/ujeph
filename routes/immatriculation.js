const { render } = require("ejs");
const express = require("express");
const path = require("path")
const Immatriculation= require("../controllers/Immatriculation");
const router = express.Router();

router.get("/register/:code_etudiant",Immatriculation.register)
router.post("/register",Immatriculation.postImmatriculation)
router.get("/get_immatriculation",Immatriculation.getImmatriculation)

module.exports= router;