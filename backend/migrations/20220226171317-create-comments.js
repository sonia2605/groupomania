'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED,
        onDelete: 'CASCADE',
        references: {
          model: 'User',
          key: 'id'
        },
      },
      postId: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED,
        onDelete: 'CASCADE',
        references: {
          model: 'Post',
          key: 'id',
        },
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING
      },
      imageUrl: {
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Comments');
  }
};