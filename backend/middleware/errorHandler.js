const { logEvents } = require("./logger");

//logging errors to our file//eg in a2 hosting, errors are only logged in development mode
//called by express next(error) to override default error handler
const errorHandler = (err, req, res, next) => {
  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    "errLog.log"
  );
  console.log(err.stack);

  const status = res.statusCode ? res.statusCode : 500; // server error

  res.status(status);

  res.json({ message: err.message, isError: true }); //isError catches any error sent as 200//check on frontend
};

module.exports = errorHandler;
