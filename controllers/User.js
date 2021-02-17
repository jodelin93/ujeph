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

const delUser = async (req,res,next)=>{
    const username=req.params.username;
    await User.destroy({
        where: {
          "username": username
        }
      });
      res.redirect("/user/table_users");
}

const editUser = async (req,res,next)=>{
    const username=req.params.username;
    const user=await User.findOne({
        where: {
          "username": username
        }
      });

    res.render("edit_user",{user});
}

const updatetUser=async  (req,res,next)=>{
    const user={
        nom_user:req.body.nom_user,
        prenom_user:req.body.prenom_user,
        username:req.body.username,
        fonction:req.body.fonction,
        droit:req.body.droit,
        statut:req.body.statut,
    }
    await User.update(user, {
        where: {
          "username": req.params.username
        }
      });
      res.redirect("/user/table_users");

}
 





module.exports={
    getRegisterPage,
    postUser,
    getUsers,
    delUser,
    editUser,
    updatetUser
}

