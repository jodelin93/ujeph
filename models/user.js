const {DataTypes} = require("sequelize");
const connection = require("./database");

const User = connection.define("User",{
id:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true,
},
nom_user:{
    type:DataTypes.STRING,
    allowNull:false
},
prenom_user:{
    type:DataTypes.STRING,
    allowNull:false
},
username:{
    type:DataTypes.STRING,
    
},
password:{
    type:DataTypes.STRING,
    allowNull:false,
    uniqueOne:{
        type:DataTypes.STRING,
        unique:"composeIndex"
    }
},
fonction:{
    type:DataTypes.STRING,
    allowNull:false,
},

droit:{
    type:DataTypes.STRING,
    allowNull:false,

},
statut:{
type:DataTypes.STRING,
allowNull:false,
defaultValue:0
}

})


module.exports=User;