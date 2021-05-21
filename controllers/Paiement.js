const Cash= require("../models/cash")
const Immatriculation = require("../models/immatriculation")
const Faculte= require("../models/faculte");
const Etudiant = require("../models/etudiant");

const registerPaiment=async (req,res,next)=>{
    const immatriculation= await Immatriculation.findAll({
        include:[Faculte],
        where: {
          "code_etudiant": req.params.code_etudiant
        }
      });
   

   res.render("paiements/register",{immatriculation}); 
}

const postRegister=async (req,res,next)=>{
    const paiement = await Cash.findAndCountAll();
    const nombre_paiement=paiement.count
       const rand1= Number.parseInt(Math.random()*100);
       const rand2= Number.parseInt(Math.random()*100);
       code_paiement = `${rand1}${nombre_paiement}${rand2}`;
       const user=`${req.session.passport.user.nom_user} ${req.session.passport.user.prenom_user}`;
       console.log(user);
    const paiement_objetct={
        ...req.body,code:code_paiement,utilisateur:user
    }
    
    await Cash.create(paiement_objetct);
    res.redirect("/paiement/getPayement");
}

const getPaiements=async (req,res,next)=>{
    const paiement=await  Cash.findAll({include:[Etudiant]});
    res.render("paiements/table_paiement",{paiement})
}



module.exports={
    registerPaiment,
    postRegister,
    getPaiements
    
}