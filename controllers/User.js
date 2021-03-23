const User= require("../models/user")
const getRegisterPage=(req,res,next)=>{
    res.render("utilisateurs/register",{message:req.flash("message"),user:req.session.user});
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
    if(req.body.password!==req.body.password_confirm){
        req.flash("message","les mots de passe ne correspondent pas");
        const message= req.flash("message");
        return res.render("utilisateurs/register",{message,user:req.session.user});
    }
    const myuser= await User.findOne({where :{"username":req.body.username}});
  
    if(myuser){
        req.flash("message","un utilisateur deja existant avec ce nom");
        const message= req.flash("message");
        return res.render("utilisateurs/register",{message,user:req.session.user});
    }else{
        await User.create(user);
        const user_list= await User.findAll();
        req.flash("message","Enregister avec Succes");
        const message= req.flash("message");
        res.render("utilisateurs/table",{message,user:user_list});
    }
   
}

const getUsers = async (req,res,next)=>{
    const user= await User.findAll();
   
    res.render("utilisateurs/table",{user,message:req.flash("message")});
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
    const users=await User.findOne({
        where: {
          "username": username
        }
      });


    res.render("utilisateurs/edit_user",{message:req.flash("message"),users,user:req.session.user});
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
      const user_list= await User.findAll();
      req.flash("message","Utilisateur modifié avec Succes");
      const message= req.flash("message");
      res.render("utilisateurs/table",{message,user:user_list});

}
 





module.exports={
    getRegisterPage,
    postUser,
    getUsers,
    delUser,
    editUser,
    updatetUser
}

