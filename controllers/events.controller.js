const utils = require('../utils/utils');

class EventsController {
  constructor () {
    this.events = [];
  }

  processMessage (eventInfo) {
    const event = utils.parseEvent(eventInfo);
    switch (event.action) {
      case 'create':
        return this.createEvent(event.params);
      case 'list':
        return this.listEvents();
      case 'delete':
        return this.deleteEvent(event.params);
      default:
        return false;
    }
  }

  createEvent (info) {
    if (info === '' || !info || info === false) {
      return false;
    }
    return this.events.push(info);
  }

  listEvents () {
    return this.events;
  }

  deleteEvent (idx) {
    const deleted = this.events.splice(idx);
    if (deleted.length === 1) { return true; }
    else { return false; }
  }

}

module.exports = EventsController;
