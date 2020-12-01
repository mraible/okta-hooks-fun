const { parse } = require("url");
const errorUtil = require("./utils/errorUtil.js");
const profileUpdateUtil = require("./utils/profileUpdateUtil.js");
const responseUtil = require("./utils/responseUtil.js");

module.exports = (req, res) => {

  const { query } = parse(req.url, true);

  //Default Command
  let commands = [];
  let error = errorUtil(query);

  switch (query.mode) {
    case 'deny-registration':
      commands.push({
        "type": "com.okta.action.update",
        "value": {
          "registration": "DENY"
        }
      });
      break;
    case 'profile-update':
      commands.push(profileUpdateUtil(query));
      break;
    default:
  }

  responseUtil.returnCommands(req, res, commands, error);

};
