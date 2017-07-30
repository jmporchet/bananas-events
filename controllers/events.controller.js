const utils = require('../utils/helpers');
const Event = require('../models/event');
const Strings = require('../utils/strings');

class EventsController {
  constructor () {
    this.events = [];
    this.event = new Event();
  }

  async processMessage (eventInfo) {
    const event = utils.parseEvent(eventInfo);
    switch (event.action) {
      case 'create':
        return await this.createEvent(event.params);
      case 'list':
        return await this.listEvents();
      case 'next':
        return await this.getNextEvent();
      case 'delete':
        return await this.deleteEvent(event.params[0]);
      default:
        return Strings.INVALID_COMMAND;
    }
  }

  async createEvent (info) {
    if (info === '' || !info || info === false) {
      return false;
    }
    const event = await this.event.createEvent(info.join(' '));
    return utils.formatEvent(event.dataValues)
  }

  async listEvents () {
    const eventList = await this.event.getEvents();
    return utils.formatEventList(eventList);
  }

  async getNextEvent () {
    const nextEvent = await this.event.getNextEvent();
    return utils.formatEvent(nextEvent.dataValues)
  }

  async deleteEvent (id) {
    return (await this.event.deleteEvent(id) !== 0) ? `Event ${id} deleted` : 'Event not found';
  }

}

module.exports = EventsController;
