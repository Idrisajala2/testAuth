const mongoose = require("mongoose");
const url = "mongodb://localhost/practiceEcommerce";

mongoose
  .connect(url)
  .then(() => {
    console.log("connect to the database successfully");
  })
  .catch(() => {
    console.log("database is now connected");
  });
