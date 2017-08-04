const eventsSerializer = require('../serializers/events.serializer');
const Event = require('../models/event');
const Strings = require('../utils/strings');

class EventsController {

  async processMessage (eventInfo) {
    const event = eventsSerializer.parseEvent(eventInfo);
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
      console.log('no info provided');
      return false;
    }
    console.log('info is', info);
    const event = await Event.createEvent(info.join(' '));
    console.log('event is', JSON.stringify(event));
    return await eventsSerializer.formatNewEvent(event.dataValues);
  }

  /* The list feature is WIP */
  // async listEvents () {
  //   const eventList = await Event.getEvents();
  //   return eventsSerializer.formatEventList(eventList);
  // }

  async getNextEvent () {
    const nextEvent = await Event.getNextEvent();
    return eventsSerializer.formatNewEvent(nextEvent.dataValues);
  }

  async deleteEvent (id) {
    return (await Event.deleteEvent(id) !== 0) ? `Event ${id} deleted` : 'Event not found';
  }

}

module.exports = EventsController;
