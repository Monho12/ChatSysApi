const express = require("express");
const {
  getUsers,
  getUser,
  deleteUser,
} = require("../controllers/user.controller");
const {
  signupUser,
  loginUser,
  Verify,
} = require("../controllers/auth.controller");

const router = express.Router();

router
  .get("/verify", Verify)
  .get("/users", getUsers)
  .get("/user/:id", getUser)
  .post("/login", loginUser)
  .post("/signup", signupUser)
  .delete("/user/:id", deleteUser);

module.exports.userRoutes = router;
