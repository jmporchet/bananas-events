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
    return `Event id ${event.dataValues.id} created`;
  }

  async listEvents () {
    return utils.formatEventList(await this.event.getEvents());
  }

  async deleteEvent (id) {
    return (await this.event.deleteEvent(id) !== 0) ? `Event ${id} deleted` : 'Event not found';
  }

}

module.exports = EventsController;
