const express = require("express");
const auth = require("../config/auth");
const Professeur= require("../controllers/Professeur");
const router = express.Router();

router.get("/registerProfesseur",auth,Professeur.registerProfesseur);
router.post("/postProfesseur",auth,Professeur.postProfesseur);
router.get("/getProfesseurs",auth,Professeur.getProfesseur);


module.exports= router;