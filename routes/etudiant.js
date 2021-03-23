const Etudiant= require("../controllers/Etudiant");
const express = require("express");
const router = express.Router();

router.get("/register_etudiant",Etudiant.register_etudiant
);
router.get("/remove_etudiant/:code_etudiant",Etudiant.remove_etudiant
);
router.get("/table_etudiants",Etudiant.get_etudiant
);
router.get("/edit_etudiant/:code_etudiant",Etudiant.edit_etudiant
);
router.get("/profil_etudiant/:code_etudiant",Etudiant.profil_etudiant
);
router.post("/post_etudiant",Etudiant.post_etudiant
);
router.post("/post_etudiant2",Etudiant.post_etudiant2
);
router.post("/post_etudiant3",Etudiant.multipleupload, Etudiant.post_etudiant3
);



module.exports=router;


