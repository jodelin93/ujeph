const {DataTypes} = require("sequelize");
const connection = require("./database");


const Etudiant=connection.define("etudiant",{
    code_etudiant:{
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true
    },
    nom_etudiant:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    prenom_etudiant:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    sexe:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    date_naissance:{
        type:DataTypes.DATE,
        allowNull:false,
    },
    lieu_naissance:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    groupe_sanguin:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    statut_matrimonial:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    cin:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    nif:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    photos:{
        type:DataTypes.STRING,
        allowNull:true,
    }

})


module.exports=Etudiant;