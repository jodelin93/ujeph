const express = require("express")
const PORT = process.env.PORT|| 3000;
const connection= require("./models/database");
const path= require("path")
const app= express();
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")));

// settings views
app.set("view engine","ejs");

//models
const User = require("./models/user")
const Faculte = require("./models/faculte")
const Etudiant = require("./models/etudiant")

//routes
const user= require("./routes/users")
const faculte= require("./routes/faculte")
const etudiant = require("./routes/etudiant");
app.use("/user/",user);
app.use("/faculte/",faculte);
app.use("/etudiant/",etudiant);


app.get("/",async (req,res,next)=>{
   
    res.render("utilisateurs/login")
});
app.post("/",async (req,res,next)=>{
  
    const user=await User.findOne({
        where: {
          "username": req.body.username,
          "password":req.body.password
        }
      });
     
      if(user){
        res.render("index")  
      }else{
        res.render("login")
      }
    
});

app.get("/index",(req,res,next)=>{
  res.render("index");
})

   connection.sync()
   app.listen(PORT,()=>{
    console.log("server connected to port "+PORT);
            })
 
