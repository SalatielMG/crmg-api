'use strict';
const moment = require('moment-timezone');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:

    */
    await queryInterface.bulkInsert('companies', [
        {
          name: 'CRMG',
          created_at: moment.tz(new Date(), process.env.SITE_TIME_ZONE).format('YYYY-MM-DD'),
          updated_at: moment.tz(new Date(), process.env.SITE_TIME_ZONE).format('YYYY-MM-DD')
        },
        {
          name: 'Test',
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
    await queryInterface.bulkDelete('companies', null, {});
  }
};
