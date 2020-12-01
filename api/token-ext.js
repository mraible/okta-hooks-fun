const { parse } = require("url");
const errorUtil = require("./utils/errorUtil.js");
const responseUtil = require("./utils/responseUtil.js");
const tokenUtil = require("./utils/tokenUtil.js");

module.exports = (req, res) => {

  const { query } = parse(req.url, true);

  let commands = [];
  let error = errorUtil(query);

  switch (query.mode) {
    case 'patch-tokens-fast':
      commands.push({
        "type": "com.okta.tokens.access.patch",
        "value": [{
          "op": "add",
          "path": "/claims/extPatientId",
          "value": "1234"
        }]
      });
      commands.push({
        "type": "com.okta.tokens.identity.patch",
        "value":[{
            "op": "add",
            "path": "claims/guid",
            "value": "F0384685-F87D-474B-848D-2058AC5655A7"
          }]
      });
      break;
    case 'patch-tokens':
      commands = tokenUtil.createPatchCommands(query);
    default:
  }

  responseUtil.returnCommands(req, res, commands, error);

};
