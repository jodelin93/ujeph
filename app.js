const express = require("express");
const session = require("express-session");
const PORT = process.env.PORT|| 3000;
const connection= require("./models/database");
const path= require("path")
const flush = require('connect-flash');
const app= express();
app.use(flush());
app.use(session({secret:"jodelindesrameaux.com@",resave:false,saveUninitialized:true}))
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public/")));

// settings views
app.set("view engine","ejs");

//models
const User = require("./models/user")
const Faculte = require("./models/faculte")
const Etudiant = require("./models/etudiant")
const Etudiant_Infos = require("./models/Etudiant_info")
const Etudiant_Documents = require("./models/etudiant_documents")
const Immatriculation = require("./models/immatriculation")

//routes
const user= require("./routes/users")
const faculte= require("./routes/faculte")
const etudiant = require("./routes/etudiant");
const immatriculation = require("./routes/immatriculation");
app.use("/user/",user);
app.use("/faculte/",faculte);
app.use("/etudiant/",etudiant);
app.use("/immatriculation/",immatriculation);

Etudiant.hasOne(Etudiant_Infos,{
  as: 'Current',
  foreignKey: 'code_etudiant',
  constraints: true
});

Etudiant.hasOne(Etudiant_Documents,{
  as: 'Current2',
  foreignKey: 'code_etudiant',
  constraints: true
});

Immatriculation.belongsTo(Etudiant,{
  foreignKey: 'code_etudiant',
  
});
 Immatriculation.belongsTo(Faculte,{
  foreignKey: 'code_faculte',
});
// Etudiant_Infos.belongsTo(Etudiant,{
//   as: 'Current',
//   foreignKey: 'code_etudiant',
//   constraints: true
// });
app.get("/",async (req,res,next)=>{
  console.log(req.flash("message"));
    res.render("utilisateurs/login",{message:req.flash("message")})
});
app.post("/",async (req,res,next)=>{
  
    const user=await User.findOne({
        where: {
          "username": req.body.username,
          "password":req.body.password
        }
      });
     
      if(user){

        
        req.session.user=user;
        res.render("index",{user:req.session.user})  
      }else{
        req.flash("message","Nom d'utilisateur ou mot de passe incorrect ");
        const message= req.flash("message");
        res.render("utilisateurs/login",{message})
      }
    
});

app.get("/index",(req,res,next)=>{
  res.render("index",{user:req.session.user});
})

app.get("/logout",(req,res,next)=>{
  res.redirect("/")
})

app.get('/download/:fichier', function(req, res){
  const file = path.join(__dirname,"public","pieces",req.params.fichier);
  console.log(file);
  res.download(file); // Set disposition and send it.
});


   connection.sync()
   app.listen(PORT,()=>{
    console.log("server connected to port "+PORT);
            })
 
