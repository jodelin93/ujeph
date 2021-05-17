const Catalogue= require("../models/catalogue");
const Cours= require("../models/cours");
const Professeur= require("../models/professeur");
const Faculte= require("../models/faculte");

const register=async  (req,res,next)=>{
    try {
        const faculte= await Faculte.aggregate( 'nom_faculte', 'DISTINCT', { plain: false });
        const professeur= await Professeur.findAll();
        const code_cours= req.params.code_cours;
       
        res.render("catalogue/register",{user:res.locals.user,faculte,code_cours,professeur});
    } catch (error) {
       console.log(error); 
    }
   
}
const getCatalogues=async  (req,res,next)=>{
    try {
       
        const catalogue= await Catalogue.findAll({include:[Professeur,Cours,Faculte]});
  
        res.render("catalogue/table_catalogues",{user:res.locals.user,catalogue});
    } catch (error) {
       console.log(error); 
    }
   
}
const postCatalogue=async  (req,res,next)=>{
    try {
        const faculte= await Faculte.findOne({
            where: {
              "nom_faculte": req.body.faculte,
              "degre_faculte": req.body.degre,
            }
          });
        
        const data_catalogue={
            code_cours:req.body.code_cours,
            code_faculte:faculte.code_faculte,
            code_professeur:req.body.professeur,
            semestre:req.body.semestre,
            status:1
        }
        await Catalogue.create(data_catalogue);
       res.redirect("/catalogue/getCatalogues");
    } catch (error) {
       console.log(error); 
    }
   
}




module.exports={
    register,
    postCatalogue,
    getCatalogues
}