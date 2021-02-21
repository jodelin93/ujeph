const Etudiant= require("../models/etudiant")
const multer = require("multer");
const path = require("path")
let code_etudiant="";

//Set Storage Engine for multer
const storage = multer.diskStorage({
    destination:"./public/photos/",
    filename: (req,file,cb) =>{
        cb(null,code_etudiant+path.extname(file.originalname))
    }
})

//Init upload
const upload = multer({
    storage:storage
}).single("photos");

const register_etudiant = async (req,res,next) =>{
    const etudiant = await Etudiant.findAndCountAll();
    const nombre_etudiant=etudiant.count
    const rand1= Math.floor(Math.random()*1000) ;
    const rand2= Math.floor(Math.random()*1000) ;
    code_etudiant = `${rand1}-${nombre_etudiant}-${rand2}`;
    console.log(code_etudiant);
res.render("etudiants/register_etudiant",{code_etudiant})
}

const post_etudiant = async (req,res,next)=>{
    upload(req,res,async (error)=>{
        if(error){
            res.render("etudiants/register_etudiant",{code_etudiant}) 
        }else{
            console.log(req.file);
            req.body={...req.body,code_etudiant,photos:req.file.filename}
            console.log(req.body);
            try {
                const etudiant= await Etudiant.create(req.body);  
            } catch (error) {
                console.log(error);
            }
            
        }
    })
    
}


module.exports={
    register_etudiant,
    post_etudiant
}