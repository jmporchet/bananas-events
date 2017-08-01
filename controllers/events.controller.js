const utils = require('../serializers/events.serializer');
const Event = require('../models/event');
const Strings = require('../utils/strings');

class EventsController {

  async processMessage (eventInfo) {
    const event = utils.parseEvent(eventInfo);
    switch (event.action) {
      case 'create':
        return await this.createEvent(event.params);
      // case 'list':
      //   return await this.listEvents();
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
    const event = await Event.createEvent(info.join(' '));
    return utils.formatNewEvent(event.dataValues);
  }

  /* The list feature is WIP */
  // async listEvents () {
  //   const eventList = await Event.getEvents();
  //   return utils.formatEventList(eventList);
  // }

  async getNextEvent () {
    const nextEvent = await Event.getNextEvent();
    return utils.formatNewEvent(nextEvent.dataValues);
  }

  async deleteEvent (id) {
    return (await Event.deleteEvent(id) !== 0) ? `Event ${id} deleted` : 'Event not found';
  }

}

module.exports = EventsController;
