module.exports = (query) => {

  var {key = "customVariable"} = query;
  var {value = "customValue" } = query;

  const profileUpdate = {
    "type": "com.okta.user.profile.update",
    "value": {
      [key]: value
    }
  };

  return profileUpdate;
}
