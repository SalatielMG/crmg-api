'use strict';
const moment = require('moment-timezone');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('personnels', [
      {
        name: 'Salatiel',
        first_name: 'Montero',
        last_name: 'González',
        address: null,
        job: 'Desarrollador de Software',
        company_id: 1,
        created_at: moment.tz(new Date(), process.env.SITE_TIME_ZONE).format('YYYY-MM-DD'),
        updated_at: moment.tz(new Date(), process.env.SITE_TIME_ZONE).format('YYYY-MM-DD')
      },
      {
        name: 'Isaí',
        first_name: 'Montero',
        last_name: 'González',
        address: null,
        job: 'CTO',
        company_id: 1,
        created_at: moment.tz(new Date(), process.env.SITE_TIME_ZONE).format('YYYY-MM-DD'),
        updated_at: moment.tz(new Date(), process.env.SITE_TIME_ZONE).format('YYYY-MM-DD')
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
