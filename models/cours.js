const connection = require("./database");
const {DataTypes} = require("sequelize");

const Cours = connection.define("cour",{
    code_cours:{
        type:DataTypes.STRING,
        primaryKey:true,
    },nom_cours:{
        type:DataTypes.STRING,
        allowNull:false
    }
    ,description:{
        type:DataTypes.TEXT,
        allowNull:true
    }
})

module.exports=Cours;