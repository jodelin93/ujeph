const Immatriculation= require("../models/immatriculation")
const Faculte= require("../models/faculte")
let message= ""

const register = async (req,res,next)=>{
    try {
        const faculte= await Faculte.aggregate( 'nom_faculte', 'DISTINCT', { plain: false });
        console.log(faculte);
        res.render("immatriculation/register",{user:req.session.user,code_etudiant:req.params.code_etudiant,faculte,message})
    } catch (error) {
       console.log(error); 
    }
    
}

const postImmatriculation = async (req,res,next)=>{
    
    try {
       
        const faculte =await Faculte.findOne({
            where: {
              "nom_faculte": req.body.faculte,
              "degre_faculte": req.body.degre,
            }
          });
         
        const immatriculation =await Immatriculation.findOne({
            where: {
              "code_etudiant": req.body.code_etudiant,
              "annee":req.body.annee,
              "code_faculte":faculte.code_faculte,
            }
          });
          if(immatriculation){
              message="cet etudiant a été déjà immatriculé pour cette année";
              const faculte= await Faculte.aggregate( 'nom_faculte', 'DISTINCT', { plain: false });
              res.render("immatriculation/register",{user:req.session.user,code_etudiant:req.body.code_etudiant,message,faculte})
          }else{
            const faculte =await Faculte.findOne({
                where: {
                  "nom_faculte": req.body.faculte,
                  "degre_faculte": req.body.degre,
                }
              });
              const matricule= {
                  ...req.body,"code_faculte":faculte.code_faculte
              }
              console.log(matricule);
              Immatriculation.create(matricule);
              res.redirect("/index");
          }
    } catch (error) {
      return res.redirect("/index");
    }
    
}

const getImmatriculation= async (req,res,next)=>{

    try {
       
          const immatriculation= await   Immatriculation.findAll({include:Faculte});
          
            console.log(immatriculation);

          

            res.render("immatriculation/table_immatricules",{immatriculation})
         
         
        
    } catch (error) {
        console.log(error);
    }
   
}

module.exports={
    register,
    postImmatriculation,
    getImmatriculation
}