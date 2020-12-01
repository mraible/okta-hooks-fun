module.exports = (query) => {
  var {mode} = query;
  var {errorSummary = "Customized Error Summary"} = query;
  var {reason = "INVALID_FORMAT" } = query;
  var {location = "email"} = query;
  var {locationType = "body"} = query;
  var {domain = "user"} = query;

  let error;
  if(mode==='error'){
    error = {
      "errorSummary": errorSummary,
      "errorCauses": [{
        "errorSummary": errorSummary,
        "reason": reason,
        "locationType": locationType,
        "location": location,
        "domain": domain
      }]
    };
  }
  
  return error;
}
