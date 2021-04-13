const { render } = require("ejs");
const express = require("express");
const path = require("path")
const Immatriculation= require("../controllers/Immatriculation");
const router = express.Router();
const auth = require("../config/auth");
router.get("/register/:code_etudiant",auth,Immatriculation.register)
router.post("/register",auth,Immatriculation.postImmatriculation)
router.get("/get_immatriculation",auth,Immatriculation.getImmatriculation)

module.exports= router;