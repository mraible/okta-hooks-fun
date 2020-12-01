let createPatchCommands = (query) => {
  let list = {};
  let commands = [];

  //Remove mode from the query parameters
  delete query.mode;

  //Prepare List
  Object.keys(query).forEach(key => {
    list[key] = !Array.isArray(query[key]) ? [query[key]]: query[key];
  });

  //Generate Commands
  Object.keys(list).forEach(key => {
    let array = list[key];
    array.forEach(x => {
      let params = x.split(':');
      let op = params[0];
      let path = params[1];
      let value = params[2];

      let patch = {
        ...(op ? { op } : {}),
        ...(path ? { path } : {}),
        ...(value ? { value } : {})
      }
      commands.push({
        'type': 'com.okta.tokens.'+ key +'.patch',
        'value': [ patch ]
      });
    });
  });

  return commands;
}

module.exports = {
  createPatchCommands
}
