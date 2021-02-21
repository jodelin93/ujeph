const Etudiant= require("../controllers/Etudiant");
const express = require("express");
const router = express.Router();

router.get("/register_etudiant",Etudiant.register_etudiant
);
router.post("/post_etudiant",Etudiant.post_etudiant
);



module.exports=router;


