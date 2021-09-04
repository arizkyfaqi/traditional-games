'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'UserGameBiodata',
        'user_id',
        Sequelize.UUID
      );
      await queryInterface.addConstraint('UserGameBiodata', {
        type: 'foreign key',
        fields: ['user_id'],
        name: 'usergame_fkey_usergamebiodata',
        allowNull: false,
        references: {
          table: 'UserGames',
          field: 'id',
        },
        onDelete: 'CASCADE',
        transaction,
      });
      return transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeConstraint(
        'UserGameBiodata',
        'usergame_fkey_usergamebiodata',
        { transaction }
      );
      await queryInterface.removeColumn('UserGameBiodata', 'user_id');
      return transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
