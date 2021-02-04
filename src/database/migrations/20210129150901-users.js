'use strict';

//yarn sequelize migration:create --name=exemplo    para criar o arquivo de migrations
//yarn sequelize db:migrate                         para criar a tabela no bd

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('usuarios',{
      id: {
        type: Sequelize.INTEGER,
        primarykey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
      usuario:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      apelido: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      senha:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      email:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      pontos:{
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('usuarios');
  }
};
