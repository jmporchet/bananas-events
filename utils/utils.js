module.exports._parseEvent = (eventInfo) => {
  const [action, ...params] = eventInfo.split(' ');
  return {action: action, params: params};
}
