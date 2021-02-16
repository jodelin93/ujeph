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

//routes
const user= require("./routes/users")
app.use("/user/",user);


app.get("/",async (req,res,next)=>{
    res.render("index")
});


   connection.sync()
   app.listen(PORT,()=>{
    console.log("server connected to port "+PORT);
            })
 
