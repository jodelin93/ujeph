const express = require("express")
const bodyParser= require("body-parser");
const PORT = process.env.PORT|| 5000;
const connection= require("./models/database");
const path= require("path")
const app= express();
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");
const User = require("./models/user")

// routes
const user= require("./routes/users")
app.use("/user/",user);
app.get("/",async (req,res,next)=>{
   
    res.render("index")
})


   connection.sync().then(result=>{
       console.log(result);
       app.listen(PORT,()=>{
        console.log("server connected to port "+PORT);
    })
   }).catch(error=>{
       console.log(error);
   })
 
