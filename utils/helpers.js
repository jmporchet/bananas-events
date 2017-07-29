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
  return Strings.EVENT_LIST + eventlist.map( ev => {
    return `\n ${ev.id} ${ev.info} ${ev.date}`
  }).join()
}
