const express = require("express");
const auth = require("../config/auth");
const Paiement= require("../controllers/Paiement");
const router = express.Router();

router.get("/register_paiement/:code_etudiant",auth,Paiement.registerPaiment);
router.post("/postRegister",auth,Paiement.postRegister);
router.get("/getPaiement",auth,Paiement.getPaiements);
// router.get("/type_depense",auth,Depense.typeDepenses);
// router.post("/type_depense",auth,Depense.postTypeDepenses);
// router.post("/postDepense",auth,Depense.postDepense);
// router.post("/postDepense/:code_depense",auth,Depense.editPostDepense);





module.exports= router;