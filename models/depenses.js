const connection = require("./database");
const {DataTypes} = require("sequelize");

const Depense = connection.define("depense",{
    code_depense:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },type:{
        type:DataTypes.STRING,
        allowNull:false
    }
    ,montant:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },memo:{
        type:DataTypes.STRING,
        allowNull:true
    },
    utilisateur:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

module.exports=Depense;