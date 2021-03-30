const connection = require("./database");
const {DataTypes} = require("sequelize");

const TypeDepense = connection.define("tydepense",{
    code:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },type:{
        type:DataTypes.STRING,
        allowNull:false
    }
    
})

module.exports=TypeDepense;