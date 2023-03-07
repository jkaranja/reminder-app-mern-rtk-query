const allowedOrigins = require("./allowedOrigins");


//allow from postman as //origin is undefined//change in production
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,//allow browser to set cookies for our responses etc
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
