const express = require("express");

const booksControllers = require("../controllers/bookControllers");
const booksRouter = express.Router();

booksRouter.route("/statistics").get(booksControllers.getStatistics);

booksRouter
  .route("/")
  .get(booksControllers.getAllBooks)
  .post(booksControllers.createBook);

booksRouter
  .route("/:id")
  .get(booksControllers.getBook)
  .patch(booksControllers.updateBook)
  .delete(booksControllers.deleteBook);

module.exports = booksRouter;
