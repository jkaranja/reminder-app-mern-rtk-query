require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

const connectDB = require("./config/dbConn");

const path = require("path");
const errorHandler = require("./middleware/errorHandler");
const { logger, logEvents } = require("./middleware/logger");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 4000; //avoid 5000//used by other services eg linkedin passport
connectDB();

//log req events
app.use(logger);
//parse data/cookie
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//allow cross origin requests//other origins to req our api//leave black to allow all
//corsOptions= {
//   origin: ["http://localhost:3050"], //can be an array or function for dynamic origins like below
//   credentials: true, //allow setting of cookies etc
//  optionsSuccessStatus: 200;
// }
//if no origin configured, it allows all origins
app.use(cors(corsOptions));
//load passport middleware for Oauth2/SSO
require("./config/passport");

/*-----------------------------------------
 * SERVE STATIC FILES i.e css, images or js files eg files in public or build folder
 ---------------------------*-------------*/
app.use("/", express.static(path.join(__dirname, "public")));
//or app.use(express.static("public"));// = 'public' means ./public

/*-----------------------------------------
 * ROUTES
 ----------------------------------------*/

app.use("/api/auth", require("./routes/authRoutes.js"));

app.use("/api/users", require("./routes/userRoutes.js"));

app.use("/api/notes", require("./routes/noteRoutes"));

app.use("/api/download", require("./routes/downloadRoutes"));
/*-----------------------------------------
 * GENERAL ROUTES
 ---------------------------*-------------*/
//---------API HOME/INDEX PAGE ROUTE--------
app.use("/", require("./routes/rootRoutes"));
//---------API 404 PAGE----------------
//app works same as .use but go thru all http verbs
app.all("*", (req, res) => {
  res.status(404);
  /**check accept header to determine response //accept html else json */
  if (req.accepts(".html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

/*-----------------------------------------
 * ERROR HANDLER
 ---------------------------*-------------*/
app.use(errorHandler);

/*-----------------------------------------
 * RUN SERVER AND OPEN CONNECTION TO DB
 ---------------------------*-------------*/
//run server only when db is connected
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
//log db connection errors
mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
