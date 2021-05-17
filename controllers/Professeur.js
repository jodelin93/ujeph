const Professeur= require("../models/professeur")

const registerProfesseur= (req,res,next)=>{
    res.render("professeurs/register_professeur",{user:res.locals.user});
}

const postProfesseur= async (req,res,next)=>{
    try {
      
       const prof= await Professeur.create(req.body); 
        res.redirect("/professeur/getProfesseurs");
    } catch (error) {
        console.log(error);
    }
}

const getProfesseur=async (req,res,next)=>{
    const professeur = await Professeur.findAll();
    res.render("professeurs/table_professeur",{professeur});
}


module.exports={
    registerProfesseur,
    postProfesseur,
    getProfesseur
}