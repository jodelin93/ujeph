const express = require("express");

const Depense= require("../controllers/Depense");
const router = express.Router();

router.get("/register_depense",Depense.registerDepense);
router.get("/get_depenses",Depense.getDepenses);
router.get("/edit_depense/:code_depense",Depense.editDepenses);
router.get("/type_depense",Depense.typeDepenses);
router.post("/type_depense",Depense.postTypeDepenses);
router.post("/postDepense",Depense.postDepense);
router.post("/postDepense/:code_depense",Depense.editPostDepense);





module.exports= router;