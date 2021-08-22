const express = require("express");
const auth = require("../config/auth");
const Notes= require("../controllers/Notes");
const router = express.Router();

router.post("/registerNotes/:code_etudiant",auth,Notes.registerNotes);
router.post("/postNotes",auth,Notes.postNotes);
router.post("/postEditNotes",auth,Notes.postEditNotes);
router.get("/edit_note/:code_note",auth,Notes.editNotes);
router.get("/delete_note/:code_note",auth,Notes.deleteNotes);

// router.get("/getCatalogues",auth,Catalogue.getCatalogues);



module.exports= router;