const connection = require("./database");
const {DataTypes} = require("sequelize");

const Faculte = connection.define("faculte",{
    code_faculte:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },nom_faculte:{
        type:DataTypes.STRING,
        allowNull:false
    }
    ,degre_faculte:{
        type:DataTypes.STRING,
        allowNull:false
    }
    ,note_passage:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
})

module.exports=Faculte;