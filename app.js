const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT|| 3000;
const connection= require("./models/database");
const path= require("path")
const flush = require('connect-flash');
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const passport = require("passport");
const app= express();
const auth = require("./config/auth");
app.use(flush());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public/")));
app.use(require("connect-flash")());
var options = {
  host: "localhost",
  port: 3306,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
};
var sessionStore = new MySQLStore(options);
app.use(
  session({
    secret: process.env.SECRET_SESSION,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);
require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());
// settings views
app.set("view engine","ejs");

//models
const User = require("./models/user")
const Faculte = require("./models/faculte")
const Etudiant = require("./models/etudiant")
const Etudiant_Infos = require("./models/Etudiant_info")
const Etudiant_Documents = require("./models/etudiant_documents")
const Immatriculation = require("./models/immatriculation")
const Depense = require("./models/depenses");
const Tydepense = require("./models/type_depense");
const Paiement = require("./models/paiement");

//routes
const user= require("./routes/users")
const faculte= require("./routes/faculte")
const etudiant = require("./routes/etudiant");
const immatriculation = require("./routes/immatriculation");
const depense = require("./routes/depense");
const paiement = require("./routes/paiement");
app.use("/user/",user);
app.use("/faculte/",faculte);
app.use("/etudiant/",etudiant);
app.use("/immatriculation/",immatriculation);
app.use("/depense/",depense);
//app.use("/paiement/",paiement);

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
Paiement.belongsTo(Etudiant,{
  foreignKey: 'code_etudiant',
  
});
 Paiement.belongsTo(Faculte,{
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
  
  passport.authenticate("local",{
    successRedirect:"/index",
    failureRedirect:"/",
    successFlash:true
})(req,res,next)
    
});

app.get("/index",auth,(req,res,next)=>{
  console.log(res.locals.user);
  res.render("index",{user:res.locals.user});
})

app.get("/logout",(req,res,next)=>{
  req.logOut();
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
 
