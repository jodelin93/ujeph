const Faculte= require("../models/faculte")

const registerFaculte= (req,res,next)=>{
    res.render("facultes/register_faculte",{user:res.locals.user});
}

const getFacultes = async (req,res,next)=>{
    const faculte= await Faculte.findAll();
   
    res.render("facultes/table_facultes",{faculte,user:res.locals.user});
}

const postFaculte = async (req,res,next)=>{
    try {
        const faculte=await  Faculte.create(req.body);
       
    if(faculte){
        res.redirect("table_facultes")
        }else{
            res.redirect("register_faculte");
        }
    } catch (error) {
        res.redirect("register_faculte");
    }

 


}

const editFaculte = async (req,res,next)=>{
    const code_faculte=req.params.code;
    const faculte =await Faculte.findOne({
        where: {
          "code_faculte": code_faculte
        }
      });

    res.render("facultes/edit_faculte",{faculte,user:res.locals.user}); 
}

const editFacultePost = async (req,res,next)=>{
    await Faculte.update({"nom_faculte":req.body.nom_faculte,"degre_faculte":req.body.degre_faculte}, {
        where: {
          "code_faculte": req.params.code
        }
      });
      res.redirect("/faculte/table_facultes");
}


module.exports={
    registerFaculte,
    postFaculte,
    getFacultes,
    editFaculte,
    editFacultePost
}