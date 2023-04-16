const express = require("express");
const cors = require("cors");
const connect = require("./config/db");
const { userRoutes } = require("./routes/user.routes");
const { msgRoutes } = require("./routes/msg.routes");
const { postRoutes } = require("./routes/post.routes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "1.5mb" }));
app.use(express.urlencoded({ limit: "1.5mb" }));

connect();

app.use(userRoutes);
app.use(msgRoutes);
app.use(postRoutes);

const port = process.env.PORT;

app.get("/", (_req, res) => {
  res.send("Goodbye World!");
});

app.listen(port, () => console.log(`Listening on port : ${port}`));
