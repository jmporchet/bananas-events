const Sequelize = require('sequelize');
const sequelize = require('../utils/db');

class Event {
  constructor () {
    /* create table events(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      info TEXT, date DATETIME,
      createdAt DATETIME,
      updatedAt DATETIME);
    */
    this.event = sequelize.define('event', {
      info: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      }
    });
  }

  async getEvents () {
    try {
      return await this.event.findAll();
    } catch (error) {
      console.error(error);
    }
  }

  async getNextEvent () {
    try {
      return await this.event.findOne({ order: [ ['date', 'ASC']]});
    } catch (error) {
      console.error(error);
    }
  }

  async createEvent (info) {
    const date = new Date();
    try {
      return await this.event.create({info: info, date});
    } catch (error) {
      console.error(error);
    }
  }

  async deleteEvent (id) {
    try {
      return await this.event.destroy({ where: { id: id } });
    } catch (error) {
      console.error(error);
    }
  }

}

module.exports = Event;
