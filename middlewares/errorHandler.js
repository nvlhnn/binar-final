const setResponse = require("../helper/response.helper");

function errorHandler(err, req, res, next) {
  console.log(err);
  if (err.status) {
    const response = setResponse("error", null, err.message);
    res.status(err.status).json(response);
  } else {
    const response = setResponse("error", null, "Internal Server Error");
    res.status(500).json(response);
  }
}

module.exports = errorHandler;
