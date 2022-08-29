require("./utils/db");
const cors = require("cors");
const express = require("express");
const app = express();
const port = 1101;

app.use(express.json());
app.use(cors());
app.use("/api", require("./router/userRouter"));
app.use("/api", require("./router/productRouter"));
app.use("/api", require("./router/likeRouter"));

app.get("/", (req, res) => {
  res.json({ message: "welcome to my practice api" });
});

app.listen(port, () => {
  console.log("you are now now listen on port ");
});
