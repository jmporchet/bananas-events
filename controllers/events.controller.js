'use strict';
const utils = require('../utils/utils');

class EventsController {

  constructor() {
    this.events = [];
  }

  processMessage (eventInfo) {
    // switch through create, list, delete
    event = utils._parseEvent(eventInfo);
    switch (event.action) {
      case 'create':
        createEvent(event.params);
        break;
      case 'list':
        listEvents();
        break;
      case 'delete':
        deleteEvent(event.params);
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

  deleteEvent (id) {
    const deleted = this.events.splice(id);
    if (deleted.length === 1) { return true; }
    else { return false; }
  }

}

module.exports = EventsController;
