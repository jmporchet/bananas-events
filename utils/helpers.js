'use strict';

const Strings = require('./strings');

module.exports.parseEvent = (eventInfo) => {
  const [action, ...params] = eventInfo.split(' ');
  return { action: action, params: params };
};

module.exports.formatEventList = (events) => {
  if (events.length < 1) {
    return Strings.NO_EVENTS;
  }

  let eventlist = events.map( el => {
    return (({ id, info, date }) => ({ id, info, date }))(el);
  });

  const eventListMessage = Strings.EVENT_LIST + eventlist.map( ev => {
    return `\n ${ev.id} ${ev.info} ${ev.date}`;
  }).join();

  return {
    "response_type": "in_channel",
    "text" : eventListMessage
  }
};

module.exports.formatEvent = (event) => {
  
  return {
    "response_type": "in_channel",
    "text" : event.info,
    "attachments": [{
      "text": "Will you come to this event?",
      "actions": [
          {
            "name": "game",
            "text": "Register",
            "type": "button",
            "value": event.id
          }
        ]
    }]
  }
}

module.exports.formatResponse = (message) => {
  return {
    "response_type": "in_channel",
    "text" : message
  }

}
