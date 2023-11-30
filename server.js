const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");
const app = require("./app");
const cors = require("cors");

app.use(cors());

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

//connect to database:
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then((con) => {
    console.log("DB connections successful");
  });

//starting server:
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
