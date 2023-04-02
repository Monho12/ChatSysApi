const express = require("express");
const {
  createMsg,
  getMsgs,
  getMsg,
  deleteMsg,
} = require("../controllers/message.controller");

const router = express.Router();

router
  .get("/msgs", getMsgs)
  .get("/msg/:id", getMsg)
  .post("/msg", createMsg)
  .delete("/msg/:id", deleteMsg);

module.exports.msgRoutes = router;
