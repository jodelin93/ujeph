const express = require("express");
const auth = require("../config/auth");
const Notes= require("../controllers/Notes");
const router = express.Router();

router.post("/registerNotes/:code_etudiant",auth,Notes.registerNotes);
 router.post("/postNotes",auth,Notes.postNotes);
// router.get("/getCatalogues",auth,Catalogue.getCatalogues);



module.exports= router;