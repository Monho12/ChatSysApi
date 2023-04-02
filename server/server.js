const express = require("express");
const cors = require("cors");
const connect = require("./config/db");
const { userRoutes } = require("./routes/user.routes");
const { msgRoutes } = require("./routes/msg.routes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

connect();

app.use(userRoutes);
app.use(msgRoutes);

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello Admin!");
});

app.listen(port, () => console.log(`Listening on port : ${port}`));
