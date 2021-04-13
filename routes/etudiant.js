const Etudiant= require("../controllers/Etudiant");
const express = require("express");
const router = express.Router();
const auth = require("../config/auth");

router.get("/register_etudiant",auth,Etudiant.register_etudiant
);
router.get("/remove_etudiant/:code_etudiant",auth,Etudiant.remove_etudiant
);
router.get("/table_etudiants",auth,Etudiant.get_etudiant
);
router.get("/edit_etudiant/:code_etudiant",auth,Etudiant.edit_etudiant
);
router.post("/edit_etudiant/:code_etudiant",auth,Etudiant.Postedit_etudiant
);
router.post("/edit_etudiant2/:code_etudiant",auth,Etudiant.Postedit_etudiant2
);
router.get("/profil_etudiant/:code_etudiant",auth,Etudiant.profil_etudiant
);
router.post("/post_etudiant",auth,Etudiant.post_etudiant
);
router.post("/post_etudiant2",Etudiant.post_etudiant2
);
router.post("/post_etudiant3",Etudiant.multipleupload, Etudiant.post_etudiant3
);



module.exports=router;


