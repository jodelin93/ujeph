const {DataTypes} = require("sequelize");
const connection = require("./database");

const Etudiant_Documents=connection.define("etudiant_document",{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    code_etudiant:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    acte_naissance:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    carte_identite:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    matricule:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    diplome_bacc:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    releve_note:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    certificat_bonne_vie:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    releve_note_institution:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    

})


module.exports=Etudiant_Documents;