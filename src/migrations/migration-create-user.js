'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
    //     id :DataTypes.STRING,
    // firstName: DataTypes.STRING,
    // lastName: DataTypes.STRING,
    // email: DataTypes.STRING,
    // address: DataTypes.STRING,
    // gender:DataTypes.BOOLEAN,
    // roleid:DataTypes.STRING
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.BOOLEAN
      },
      roleId: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      positionId: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};