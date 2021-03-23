const {DataTypes} = require("sequelize");
const connection = require("./database");


const Etudiant_Infos=connection.define("etudiant_info",{
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
    occupation:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    personne_resp:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    telephone_resp:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    telephone_etudiant:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    maladie:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    contact_maladie:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    

})


module.exports=Etudiant_Infos;