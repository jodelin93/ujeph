const Catalogue= require("../models/catalogue")
const Cours= require("../models/cours")
const Notes= require("../models/notes")


const registerNotes =async (req,res,next)=>{
    const code_etudiant=req.params.code_etudiant;
    const semestre=req.body.semetre;
    const code_faculte=req.body.faculte
 
    try {
        const cours = await Catalogue.findAll({include:Cours,
            where: {
              "code_faculte":code_faculte ,
              "semestre": semestre,
              "status":1,
              
            }
          })
          
          const notes = await Notes.findAll({
            where: {
              "code_faculte":code_faculte ,
              "semestre": semestre,
              "code_etudiant":code_etudiant,
              
            }
          })
          console.log(notes[0]);
          res.render("notes/register_notes",{user:res.locals.user,code_etudiant,code_faculte,semestre,cours,notes});  

    } catch (error) {
        console.log(error);
    }

   
}


const postNotes= async (req,res,next)=>{
    
    
    try {
        if(Array.isArray(req.body.notes)){
            const notes= req.body.notes.filter(item=>item!=="")
            notes.forEach(async function(element,index){
                
                const data={
                    code_etudiant:req.body.code_etudiant,
                    semestre:req.body.semestre,
                    note:element,
                    code_cours:req.body.code_cours[req.body.notes.indexOf(element)],
                    code_faculte:req.body.code_faculte
        
                }
                await  Notes.create(data); 
            })
        }else{
            const taille= req.body.code_cours.length;
            const code_cours= req.body.code_cours[taille-1];
            const data={...req.body,"code_cours":code_cours,"note":req.body.notes}
            delete data.notes;
            await  Notes.create(data); 
           
        }

       
       
    } catch (error) {
        console.log(error);
    }

    

    
    
}

module.exports={
    registerNotes,
    postNotes
    
   
}