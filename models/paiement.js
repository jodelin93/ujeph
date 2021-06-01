const connection = require("./database");
const {DataTypes} = require("sequelize");

const Paiement = connection.define("paiement",{
    code_paiement:{
        type:DataTypes.STRING,
        primaryKey:true,
    },mode_paiement:{
        type:DataTypes.STRING,
        allowNull:false
    }
    ,montant:{
        type:DataTypes.DOUBLE,
        allowNull:false

    },code_etudiant:{
        type:DataTypes.STRING,
        allowNull:false

    },nom_faculte:{
        type:DataTypes.STRING,
        allowNull:false
    },objet_paiement:{
        type:DataTypes.STRING,
        allowNull:false
    },
    annee_academique:{
        type:DataTypes.STRING,
        allowNull:false
    },
    
    utilisateur:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

module.exports=Paiement;