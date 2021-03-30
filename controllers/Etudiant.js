const Etudiant= require("../models/etudiant")
const Etudiant_info= require("../models/Etudiant_info")
const Etudiant_documents= require("../models/etudiant_documents")
const multer = require("multer");
const {LocalStorage}= require('node-localstorage');
const path = require("path")
const fs = require('fs');
let code_etudiant="";
var localStorage = new LocalStorage('./scratch');
  //Set Storage Engine for multer
  const storage = multer.diskStorage({
    destination:"./public/pieces/",
    filename: (req,file,cb) =>{
        cb(null,code_etudiant+"_"+file.fieldname+path.extname(file.originalname))
    }
})

//Init upload
const upload = multer({
    storage:storage
});

var multipleupload = upload.fields([
    { name:"acte_naissance"},
    { name:"carte_identite"},
    { name:"matricule"},
    { name:"diplome_bacc"},
    { name:"releve_note"},
    { name:"certificat_bonne_vie"},
    { name:"releve_note_institution"},
])


const register_etudiant = async (req,res,next) =>{
    const etudiant = await Etudiant.findAndCountAll();
    const nombre_etudiant=etudiant.count
    const rand1= Math.floor(Math.random()*1000) ;
    const rand2= Math.floor(Math.random()*1000) ;
    code_etudiant = `${rand1}-${nombre_etudiant}-${rand2}`;
    console.log(code_etudiant);
res.render("etudiants/register_etudiant",{code_etudiant,user:req.session.user})
}

const post_etudiant =  (req,res,next)=>{
    //Set Storage Engine for multer
const storage = multer.diskStorage({
    destination:"./public/photos/",
    filename: (req,file,cb) =>{
        cb(null,code_etudiant+path.extname(file.originalname))
    }
})

//Init upload
const upload = multer({
    storage:storage
}).single("photos");

    upload(req,res,async (error)=>{
        if(error){
            res.render("etudiants/register_etudiant",{code_etudiant,user:req.session.user}) 
        }else{
           
            req.body={...req.body,code_etudiant,photos:req.file.filename}
           
            try {
            
                localStorage.setItem('etudiant',JSON.stringify(req.body)) ;
                const etudiant=JSON.parse(localStorage.getItem("etudiant"));
                
                var date_nai = new Date(etudiant.date_naissance).toISOString().slice(0,10);
                res.render("etudiants/register_etudiant2",{date_nai,etudiant,user:req.session.user}) 
            } catch (error) {
                console.log(error);
            }
            
        }
    })   
}

const post_etudiant2 =  async  (req,res,next)=>{

    try {
        const etudiant=await Etudiant.create(JSON.parse(localStorage.getItem("etudiant")));
        const etudiant_infos = await Etudiant_info.create(req.body)
        if(etudiant_infos){
          res.redirect("table_etudiants"); 
        }
    } catch (error) {
        console.log(error);
    }
        
}

const post_etudiant3 =  async (req,res,next)=>{
     if(!req.files){
        res.render("etudiants/register_etudiant3",{code_etudiant,user:req.session.user}) 
     }else{
        try {
            
        const pieces = {
            acte_naissance:req.files.acte_naissance[0].filename,
            carte_identite:req.files.carte_identite[0].filename,
            matricule:req.files.matricule[0].filename,
            diplome_bacc:req.files.diplome_bacc[0].filename,
           releve_note:req.files.releve_note[0].filename,
            certificat_bonne_vie:req.files.certificat_bonne_vie[0].filename,
           releve_note_institution:req.files.releve_note_institution[0].filename,
           code_etudiant:code_etudiant
        }
        console.log(pieces);
        const documents = await Etudiant_documents.create(pieces);
        if(documents){
            res.redirect("table_etudiants");
        }
        } catch (error) {
            console.log(error);
        } 
     }

    
        
}


const get_etudiant = async (req,res,next)=>{
    const etudiant = await Etudiant.findAll();
    res.render("etudiants/table_etudiants",{etudiant,user:req.session.user})

}

const remove_etudiant = async (req,res,next)=>{
    const code=req.params.code_etudiant;
    const directory = './public/photos';
    const directory2 = './public/pieces';
    fs.readdir(directory, (err, files) => {
        if (err) throw err;
      const filter = files.filter(fn => fn.startsWith(code));
        for (const file of filter) {
            
          fs.unlink(path.join(directory, file), err => {
            if (err) throw err;
          });
        }
      });
      fs.readdir(directory2, (err, files) => {
        if (err) throw err;
      const filter = files.filter(fn => fn.startsWith(code));
        for (const file of filter) {
            
          fs.unlink(path.join(directory2, file), err => {
            if (err) throw err;
          });
        }
      });
    console.log(code);
    await Etudiant.destroy({
        where: {
          "code_etudiant": code
        }
      });

       res.redirect("/etudiant/table_etudiants");
}

const profil_etudiant = async (req,res,next)=>{
    try {
        const etudiant=await Etudiant.findOne({
            where: {
              "code_etudiant": req.params.code_etudiant
            }
          });
          const etudiant_infos=await Etudiant_info.findOne({
            where: {
              "code_etudiant": req.params.code_etudiant
            }
          });
          const etudiant_documents=await Etudiant_documents.findOne({
            where: {
              "code_etudiant": req.params.code_etudiant
            }
          });
          let infos_etudiant=null;
          if(!etudiant_infos){
            infos_etudiant={
              "occupation":"",
              "personne_resp":"",
              "telephone_resp":"",
              "personne_resp":"",
              "maladie":"",
              "contact_maladie":""
            }
            }else{
              infos_etudiant=etudiant_infos;
            }
          res.render("etudiants/profile_etudiants",{user:req.session.user,etudiant,"etudiant_infos":infos_etudiant,etu_doc:etudiant_documents})
    } catch (error) {
        console.log(error);
    }
    
}

const edit_etudiant= async (req,res,next)=>{
  console.log("yes");
  const code_etudiant= req.params.code_etudiant;
 try {
  const etudiant=await Etudiant.findOne({
    where: {
      "code_etudiant": code_etudiant
    }
  });

  const etudiant_infos=await Etudiant_info.findOne({
    where: {
      "code_etudiant": req.params.code_etudiant
    }
  });
  var date_naissance = new Date(etudiant.date_naissance).toISOString().slice(0,10);
  res.render("etudiants/edit_etudiant",{user:req.session.user,date_naissance,etudiant,etudiant_infos});
 } catch (error) {
   console.log(error);
 }
 
}

const Postedit_etudiant= async (req,res,next)=>{
  
  const code_etudiant= req.params.code_etudiant;
  
  const etudiant={
    "nom_etudiant":req.body.nom_etudiant,
    "prenom_etudiant":req.body.prenom_etudiant,
    "sexe":req.body.sexe,
    "date_naissance":req.body.date_naissance,
    "lieu_naissance":req.body.lieu_naissance,
    "group_sanguin":req.body.group_sanguin,
    "statut_matrimonial":req.body.group_sanguin,
    "email":req.body.email,
    "cin":req.body.cin,
    "nif":req.body.nif
  }

  await Etudiant.update(etudiant, {
    where: {
      "code_etudiant": code_etudiant
    }
  });
  res.redirect("/etudiant/table_etudiants");
}

const Postedit_etudiant2= async (req,res,next)=>{
  
  const code_etudiant= req.params.code_etudiant;
  
  const etudiant_infos={
    "occupation":req.body.occupation,
    "personne_resp":req.body.personne_resp,
    "telephone_resp":req.body.telephone_resp,
    "telephone_etudiant":req.body.telephone_etudiant,
    "maladie":req.body.maladie,
    "contact_maladie":req.body.contact_maladie,
  }

  await Etudiant_info.update(etudiant_infos, {
    where: {
      "code_etudiant": code_etudiant
    }
  });
  res.redirect("/etudiant/table_etudiants");
}


module.exports={
    register_etudiant,
    post_etudiant,
    post_etudiant2,
    post_etudiant3,
    multipleupload,
    get_etudiant,
    remove_etudiant,
    profil_etudiant,
    edit_etudiant,
    Postedit_etudiant,
    Postedit_etudiant2
}