
const Etudiant = require("../models/etudiant");
const Bourse = require("../models/bourses");

const register=async (req,res,next)=>{
    const etudiant=await Etudiant.findOne({where:{
        "code_etudiant":req.params.code_etudiant
    }});
    console.log(etudiant);

    res.render("bourses/register",{etudiant})
}
const postRegister=async (req,res,next)=>{
    Bourse.create(req.body);
    res.redirect("/bourse/getBourses")
}
const getBourses=async (req,res,next)=>{
    const bourses= await Bourse.findAll({include:[Etudiant]});
    res.render("bourses/table_bourses",{bourses})
}


 
module.exports={
    register,
    postRegister,
    getBourses
  
    
}