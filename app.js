const express = require("express");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const path = require("path");
const app = express();

//app settings:

//global middlewares:

//parsing JSON from client:
app.use(express.json());

//route-handlers:
const usersRouter = require("./routes/usersRoutes.js");

//api routes:
app.use("/api/v1/users", usersRouter);

//for unhandled routes:
app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});

//global error handling middleware:
app.use(globalErrorHandler);

module.exports = app;
