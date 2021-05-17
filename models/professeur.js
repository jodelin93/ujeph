const {DataTypes} = require("sequelize");
const connection = require("./database");


const Professeur=connection.define("professeur",{
    code_professeur:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    nom_professeur:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    prenom_professeur:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    sexe:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    
    telephone:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    

})


module.exports=Professeur;