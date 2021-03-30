const Depense= require("../models/depenses")
const TypeDepense= require("../models/type_depense")

const registerDepense=async (req,res,next)=>{
    const typeDepense= await TypeDepense.findAll();
    res.render("depenses/register_depense",{user:req.session.user,typeDepense});
}

const getDepenses = async (req,res,next)=>{
    const depense= await Depense.findAll();
    
    res.render("depenses/table_depenses",{depense,user:req.session.user});
}

const postDepense = async (req,res,next)=>{
    const utilisateur = req.session.user.nom_user+""+req.session.user.prenom_user;
    const depense={...req.body,utilisateur};
    try {
        await Depense.create(depense)
        res.redirect("/depense/get_depenses");
    } catch (error) {
        
    }
   


}

const editDepenses = async (req,res,next)=>{
    const code_depense=req.params.code_depense;
    const depense =await Depense.findOne({
        where: {
          "code_depense": code_depense
        }
      });

    res.render("depenses/edit_depense",{depense,user:req.session.user}); 
}

const typeDepenses = async (req,res,next)=>{
    res.render("depenses/type_depense",{user:req.session.user}); 
}

const postTypeDepenses = async (req,res,next)=>{

    try {
        await TypeDepense.create(req.body)
        res.redirect("/depense/get_depenses");
    } catch (error) {
        
    }
   


}

const editPostDepense = async (req,res,next)=>{
    await Depense.update({"montant":req.body.montant,"memo":req.body.memo}, {
        where: {
          "code_depense": req.params.code_depense
        }
      });
      res.redirect("/depense/get_depenses");
}


module.exports={
    registerDepense,
    postDepense,
    getDepenses,
    editDepenses,
    editPostDepense,
    typeDepenses,
    postTypeDepenses
}