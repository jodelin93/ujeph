const express = require("express");
const auth = require("../config/auth");
const Bourse= require("../controllers/Bourse");
const router = express.Router();

router.get("/register/:code_etudiant",auth,Bourse.register);
router.post("/postRegister",auth,Bourse.postRegister);
router.get("/getBourses",auth,Bourse.getBourses);
// router.get("/type_depense",auth,Depense.typeDepenses);
// router.post("/type_depense",auth,Depense.postTypeDepenses);
// router.post("/postDepense",auth,Depense.postDepense);
// router.post("/postDepense/:code_depense",auth,Depense.editPostDepense);





module.exports= router;