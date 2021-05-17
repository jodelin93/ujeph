const Cours= require("../models/cours")


const registerCours = (req,res,next)=>{
    res.render("cours/register_cours",{user:res.locals.user});
}

const postCours = async (req,res,next)=>{
    const code_cours=req.body.nom_cours.substring(0,3)+"-"+Math.round((Math.random()*1000));
    const nom_cours= req.body.nom_cours.toUpperCase();
    const data_cours={
        code_cours:code_cours,
        nom_cours:nom_cours,
        description:req.body.description
    }
           try {
             const cours  =await  Cours.findOne({where:{"nom_cours":nom_cours}})

             if(cours){
                 return res.status(400);
             }else{
                await Cours.create(data_cours);
                res.redirect("/cours/getCours");
             }
            
           } catch (error) {
               console.log(error);
           }
    
}

const getCours = async (req,res,next)=>{
        try {
            const cours= await Cours.findAll();

           res.render("cours/table_cours",{cours});
          
        } catch (error) {
            
        }
}


module.exports={
    registerCours,
    postCours,
    getCours
   
}