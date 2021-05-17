const express = require("express");
const auth = require("../config/auth");
const Catalogue= require("../controllers/Catalogue");
const router = express.Router();

router.get("/register/:code_cours",auth,Catalogue.register);
router.post("/postCatalogue",auth,Catalogue.postCatalogue);
router.get("/getCatalogues",auth,Catalogue.getCatalogues);



module.exports= router;