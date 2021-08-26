const path = require("path");
const express = require("express");
const cors = require('cors')
const app = express();

module.exports = app;

// logging middleware

const corsOptions =  {
  origin: "https://okra-onions.herokuapp.com",
  optionSuccessStatus: 200
}

// body parsing middleware
app.use(express.json());
app.use(cors(corsOptions));

// auth and api routes
app.use("/auth", require("./auth"));
app.use("/api", require("./api"));

// static file-serving middleware

app.use(express.static(path.join(__dirname, "..", "public")));

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});
