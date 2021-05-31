'use strict';
const moment = require('moment-timezone');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      company_id: 1,
      personnel_id: 1,
      email: 'salatiel.monteroglez@gmail.com',
      username: 'sala',
      created_at: moment.tz(new Date(), process.env.SITE_TIME_ZONE).format('YYYY-MM-DD'),
      updated_at: moment.tz(new Date(), process.env.SITE_TIME_ZONE).format('YYYY-MM-DD')
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
