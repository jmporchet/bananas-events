module.exports.parseEvent = (eventInfo) => {
  const [action, ...params] = eventInfo.split(' ');
  return { action: action, params: params };
};

module.exports.formatEventList = (events) => {
  if (events.length < 1) {
    return 'There are no events. You can create one by typing /padel create <your event>'
  }
  let eventlist = events.map( el => {
    return (({ id, info, date }) => ({ id, info, date }))(el);
  });
  return 'Here\'s the list of the next events:' + eventlist.map( ev => {
    return `\n ${ev.id} ${ev.info} ${ev.date}`
  }).join()
}
