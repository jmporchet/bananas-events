const utils = require('../utils/helpers');
const Event = require('../models/event');

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
        return false;
    }
  }

  async createEvent (info) {
    if (info === '' || !info || info === false) {
      return false;
    }
    const event = await this.event.createEvent(info.toString());
    return event;
  }

  async listEvents () {
    const events = await this.event.getEvents();
    return events;
  }

  async deleteEvent (id) {
    const deleted = this.event.deleteEvent(id);
    return deleted;
  }

}

module.exports = EventsController;
