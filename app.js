const express = require("express")
const bodyParser= require("body-parser");
const PORT = process.env.PORT|| 5000;
const path= require("path")
const app= express();
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");

app.get("/",(req,res,next)=>{
    res.render("index")
})


app.listen(PORT,()=>{
    console.log("server connected to port "+PORT);
})