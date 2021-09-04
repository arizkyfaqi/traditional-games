'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'user_game',
      [
        {
          id: 1,
          username: 'rara',
          password: '12345678',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          username: 'nana',
          password: '12345678',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          username: 'lala',
          password: '12345678',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      'user_game_biodata',
      [
        {
          id: 1,
          user_id: 1,
          fullname: 'rara wati',
          phone: 86744456777,
          email: 'rara@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          user_id: 2,
          fullname: 'nana wati',
          phone: 86744456777,
          email: 'nana@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          user_id: 3,
          fullname: 'nana wati',
          phone: 86744456777,
          email: 'nana@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      'user_game_history',
      [
        {
          id: 1,
          user_id: 2,
          game: 'rps',
          score: 30,
          time: '5m',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          user_id: 3,
          game: 'rps',
          score: 50,
          time: '6m',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
