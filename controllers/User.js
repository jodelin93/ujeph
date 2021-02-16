const User= require("../models/user")
const getRegisterPage=(req,res,next)=>{
    res.render("register");
}

const postUser = async (req,res,next)=>{
    const user={
        nom_user:req.body.nom_user,
        prenom_user:req.body.prenom_user,
        username:req.body.username,
        password:req.body.password,
        fonction:req.body.fonction,
        droit:req.body.droit,
        statut:req.body.statut,

    }
    const myuser= await User.findOne({where :{"username":req.body.username}});
  
    if(myuser){
        return res.redirect("/user/register");
    }else{
        await User.create(user);
        res.redirect("/user/table_users");
    }
   
}

const getUsers = async (req,res,next)=>{
    const user= await User.findAll();
   
    res.render("table_user",{user});
}
 





module.exports={
    getRegisterPage,
    postUser,
    getUsers
}

