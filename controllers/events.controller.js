'use strict';
const utils = require('../utils/utils');

class EventsController {

  constructor() {
    this.events = [];
  }

  processMessage (eventInfo) {
    // switch through create, list, delete
    let event = utils._parseEvent(eventInfo);
    switch (event.action) {
      case 'create':
        return this.createEvent(event.params);
        break;
      case 'list':
        return this.listEvents();
        break;
      case 'delete':
        return this.deleteEvent(event.params);
        break;
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
