const express = require("express");
const auth = require("../config/auth");
const Payement= require("../controllers/Paiement");
const router = express.Router();

router.get("/register_paiement/:code_etudiant",auth,Payement.registerPaiment);
router.post("/postRegister",auth,Payement.postRegister);
router.get("/getPayement",auth,Payement.getPaiements);
// router.get("/type_depense",auth,Depense.typeDepenses);
// router.post("/type_depense",auth,Depense.postTypeDepenses);
// router.post("/postDepense",auth,Depense.postDepense);
// router.post("/postDepense/:code_depense",auth,Depense.editPostDepense);





module.exports= router;