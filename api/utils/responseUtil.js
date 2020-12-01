let returnCommands = (request, response, commands, error) => {

  let statusCode;
  let json = {};

  if (Array.isArray(commands) && commands.length > 0) {
    json.commands = commands;
  }

  if (error) {
    json.error = error;
  }

  if (json.commands || json.error) {
    statusCode = 200;
  } else {
    statusCode = 204;
  }

  response.writeHead(statusCode, //status code
    {
      "Content-Type": "application/json"
    }
  );
  console.log(JSON.stringify(json));
  response.end(JSON.stringify(json));
}

module.exports = {
  returnCommands
}
