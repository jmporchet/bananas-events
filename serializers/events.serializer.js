'use strict';

const Strings = require('../utils/strings');

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
    'response_type': 'in_channel',
    'text' : eventListMessage
  };
};

module.exports.formatNewEvent = (event) => {

  return {
    'response_type': 'in_channel',
    'text' : event.info,
    'attachments': [{
      'text': 'A new event has just been created! Will you attend?',
      'attachment_type': 'default',
      'actions': [
        {
          'name': 'register',
          'text': 'Register',
          'type': 'button',
          'value': event.id
        }
      ],
      'callback_id': 'participate',
    }]
  };
};

module.exports.formatRegisteredEvent = (event) => {

  return {
    'response_type': 'ephemeral',
    'text' : event.info,
    'attachments': [{
      'text': 'A new event has just been created! Will you attend?',
      'attachment_type': 'default',
      'actions': [
        {
          'name': 'unregister',
          'text': 'Unregister',
          'type': 'button',
          'value': event.id
        }
      ],
      'callback_id': 'participate',
    }]
  };
};

module.exports.formatResponse = (message) => {
  return {
    'response_type': 'in_channel',
    'text' : message
  };

};
