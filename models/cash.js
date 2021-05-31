const connection = require("./database");
const {DataTypes} = require("sequelize");

const Cash = connection.define("cash",{
    code:{
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
    date_paiement:{
        type:DataTypes.DATE,
        allowNull:false
    },
    utilisateur:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

module.exports=Cash;