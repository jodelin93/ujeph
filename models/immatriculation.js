const connection = require("./database");
const {DataTypes} = require("sequelize");

const Immatriculation = connection.define("immatriculation",{
    
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
    code_faculte:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },niveau:{
        type:DataTypes.STRING,
        allowNull:false
    },vacation:{
        type:DataTypes.STRING,
        allowNull:false
    }
    ,degre:{
        type:DataTypes.STRING,
        allowNull:false
    }
    ,annee:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

module.exports=Immatriculation;