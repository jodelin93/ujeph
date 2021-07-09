const Catalogue= require("../models/catalogue")
const Cours= require("../models/cours")
const Notes= require("../models/notes")
const Etudiant = require("../models/etudiant")
const Immatriculation = require("../models/immatriculation")
const Faculte = require("../models/faculte")
var PdfTable = require('voilab-pdf-table'),
    PdfDocument = require('pdfkit');

    const fs= require("fs");
    const path=require("path");


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
              if(req.body.ajouter){
              res.render("notes/register_notes",{user:res.locals.user,code_etudiant,code_faculte,semestre,cours,notes});  
            }else if(req.body.ajouterOne){
                res.render("notes/register_note",{user:res.locals.user,code_etudiant,code_faculte,semestre,cours,notes}); 
            }else if(req.body.voir){
               
                const notes= await Notes.findAll({include:[Cours,Etudiant],
                    where: {
                      "code_etudiant":code_etudiant ,
                      "semestre": semestre,
                      
                    }
                  });
                 
                res.render("notes/table_notes",{notes});
            }else if(req.body.bulletin){
                const nieau=null;
                if(semestre==="I"|| semestre==="II"){
                    niveau="I";
                }else if(semestre==="III"|| semestre==="IV"){
                    niveau="II";
                }else if(semestre==="V"|| semestre==="VI"){
                    niveau="III";
                }else if(semestre==="VII"|| semestre==="VIII"){
                    niveau="IV";
                }else if(semestre==="IX"|| semestre==="X"){
                    niveau="V"
                }
                const annee= await Immatriculation.findOne({ where: {
                    "code_etudiant":code_etudiant ,
                    "niveau": semestre,
                    
                  }})
                const fac= await Faculte.findOne({ where: {
                    "code_faculte":code_faculte
                    
                  }})
                const etud= await Etudiant.findOne({ where: {
                    "code_etudiant":code_etudiant ,
                    
                  }})

                  const notes= await Notes.findAll({include:[Cours,Etudiant,Faculte],
                    where: {
                      "code_etudiant":code_etudiant ,
                      "semestre": semestre,
                      
                    }
                  });
                  if(!annee){
                      res.redirect("/etudiant/profil_etudiant/"+code_etudiant);
                  }
                var doc = new PdfDocument();
                var labelannee=null;
                if(niveau==="I"){
                    labelannee="Premiere Annee";
                }else if(niveau==="II"){
                    labelannee="Deuxieme Annee";
                }else if(niveau==="III"){
                    labelannee="Troisieme Annee";
                }else if(niveau==="IV"){
                    labelannee="Quatrieme Annee";
                }else if(niveau==="V"){
                    labelannee="Cinquieme Annee";
                }
                doc.image('public/bulletin/bulletin.JPG', 0,15,{width:600});
                doc.image('public/bulletin/bulletin2.JPG', 0,700,{width:600});
                doc.moveDown(6.5);
                doc.fontSize(16). text(`Bulletin Semeste ${semestre} Annee Academique ${annee.annee}`,{align:"center",oblique:true}).font('Helvetica');
                doc.moveDown(1);
                doc.fontSize(12).text(`Code                    ${code_etudiant}`);
                doc.text(`Nom complet       ${etud.nom_etudiant.toUpperCase()} ${etud.prenom_etudiant.toUpperCase()}`);
                doc.text(`Niveau                 ${labelannee}`);
                doc.text(`Faculte                ${fac.nom_faculte}`);
                
                doc.moveDown(2);
                doc.font("Helvetica-Bold").fontSize(12). text(`Note                                                                        Nom Cours`.toUpperCase()).font('Helvetica-Bold');
              
                var total=0;
                var count=0;
                const color1="red";
                const color2="black";
                

                notes.forEach(note=>{
                    total=total+Number.parseInt(note.note);
                    count++;
                  if(note.note<note.faculte.note_passage){
                    doc.fontSize(10).fillColor(`${color1}`). text(`${note.note} ________________________________________________  ${note.cour.nom_cours}`,{oblique:true,align:"justify",fill:true}).font('Helvetica-Bold'); 
                    doc.fillColor(`${color2}`)
                }else{

                
                    doc.fontSize(10). text(`${note.note} ________________________________________________  ${note.cour.nom_cours}`,{oblique:true,align:"justify"}).font('Helvetica-Bold');
                }
                })
                doc.fontSize(14).fillColor("green").text(`Total:    ${total}.00`.toUpperCase(),400,650,{align:"right"} );
                doc.fontSize(14).fillColor("green").text(`Moyenne:  ${total/count}`.toUpperCase(),400,670,{align:"right"});

                
                  doc.pipe(res);
                doc.end();
            }
        } catch (error) {
            console.log(error);
        }
   
    

   
}


const postNotes= async (req,res,next)=>{
    
    if(req.body.enregister){
    
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
                const note=await  Notes.create(data); 
                if(note){
                    res.redirect("/index");
                }
            })
        }else{
            const taille= req.body.code_cours.length;
            const code_cours= req.body.code_cours[taille-1];
            const data={...req.body,"code_cours":code_cours,"note":req.body.notes}
            delete data.notes;
            const note=await  Notes.create(data); 
            if(note){
                res.redirect("/index");
            }
           
        }

       
       
    } catch (error) {
        console.log(error);
    }
    }else if(req.body.enregistrerUne){
      const note=  await  Notes.create(req.body); 
      if(note){
          res.redirect("/index");
      }
    }
   
}

const editNotes=async (req,res,next)=>{
  const code_note=Number.parseInt(req.params.code_note);
   res.render("notes/modifier_note",{user:res.locals.user,code_note});
}

const postEditNotes=async (req,res,next)=>{
    const data_note={
        "note":req.body.note
    }
    const note= Notes.update(data_note,{where:{"code":req.body.code_note}})
     res.redirect("/index");
  }

module.exports={
    registerNotes,
    postNotes,
    editNotes,
    postEditNotes
    
   
}