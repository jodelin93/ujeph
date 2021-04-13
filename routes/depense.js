const express = require("express");
const auth = require("../config/auth");
const Depense= require("../controllers/Depense");
const router = express.Router();

router.get("/register_depense",auth,Depense.registerDepense);
router.get("/get_depenses",auth,Depense.getDepenses);
router.get("/edit_depense/:code_depense",auth,Depense.editDepenses);
router.get("/type_depense",auth,Depense.typeDepenses);
router.post("/type_depense",auth,Depense.postTypeDepenses);
router.post("/postDepense",auth,Depense.postDepense);
router.post("/postDepense/:code_depense",auth,Depense.editPostDepense);





module.exports= router;