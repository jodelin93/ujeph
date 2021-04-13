const connection = require("./database");
const {DataTypes} = require("sequelize");
const Paiement = connection.define("paiement",{
    code_paiement:{
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue: DataTypes.UUIDV4,
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

    },code_faculte:{
        type:DataTypes.INTEGER,
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