const express = require("express");
const auth = require("../config/auth");
const Cours= require("../controllers/Cours");
const router = express.Router();

router.get("/register",auth,Cours.registerCours);
router.post("/postCours",auth,Cours.postCours);
router.get("/getCours",auth,Cours.getCours);


module.exports= router;