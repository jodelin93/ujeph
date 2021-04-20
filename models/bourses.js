const connection = require("./database");
const {DataTypes} = require("sequelize");

const Bourse = connection.define("bourse",{
    code:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },code_etudiant:{
        type:DataTypes.STRING,
        allowNull:false

    },montant:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    annee:{
        type:DataTypes.STRING,
        allowNull:false
    },
    
})

module.exports=Bourse;