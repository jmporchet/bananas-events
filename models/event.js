const Sequelize = require('sequelize');
const sequelize = require('../utils/db');
const Console = console;

const Event = sequelize.define('event', {
  info: {
    type: Sequelize.STRING
  },
  date: {
    type: Sequelize.DATE
  }
});

module.exports.getEvents = async () => {
  try {
    return await this.event.findAll();
  } catch (error) {
    Console.error(error);
  }
};

module.exports.getNextEvent = async () => {
  try {
    return await this.event.findOne({ order: [ ['date', 'ASC']]});
  } catch (error) {
    Console.error(error);
  }
};

module.exports.createEvent = async (info) => {
  const date = new Date();
  try {
    return await this.event.create({info: info, date});
  } catch (error) {
    Console.error(error);
  }
};

module.exports.deleteEvent = async (id) => {
  try {
    return await this.event.destroy({ where: { id: id } });
  } catch (error) {
    Console.error(error);
  }
};
