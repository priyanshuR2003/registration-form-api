const express = require("express");
const app = express();
const path = require("path");

//global middlewares:
app.use(express.json());

//route-handlers:
const booksRouter = require("./routes/bookRoutes.js");

app.use("/api/books", booksRouter);

//for unhandled routes:
app.all("*", (req, res, next) => {
  console.log(`Error 404, can't find ${req.originalUrl} URL`);
  next();
});

module.exports = app;
