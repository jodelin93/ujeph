const connection = require("./database");
const {DataTypes} = require("sequelize");

const Catalogue = connection.define("catalogue",{
    code:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },  code_cours:{
        type:DataTypes.STRING,
    },code_faculte:{
        type:DataTypes.INTEGER,
    },code_professeur:{
        type:DataTypes.INTEGER,
    },
    semestre:{
        type:DataTypes.STRING,
        allowNull:false
    }, status:{
        type:DataTypes.INTEGER,
        default:1
    },
    
})

module.exports=Catalogue;