const connection = require("./database");
const {DataTypes} = require("sequelize");

const Notes = connection.define("note",{
    code:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },  code_cours:{
        type:DataTypes.STRING,
    },code_faculte:{
        type:DataTypes.INTEGER,
    },code_etudiant:{
        type:DataTypes.STRING,
       
    },
    semestre:{
        type:DataTypes.STRING,
        allowNull:false
    }, note:{
        type:DataTypes.DECIMAL,
        allowNull:false,
    },
    
})

module.exports=Notes;