const Sequelize = require("sequelize")

const sequelize =new  Sequelize('ujeph_test', 'root', 'mysql', {
    host: 'localhost',
    dialect: 'mysql'
  });

  module.exports=sequelize;