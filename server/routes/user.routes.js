const express = require("express");
const {
  Verify,
  getUsers,
  getUser,
  deleteUser,
  addUserMsg,
} = require("../controllers/user.controller");
const { signupUser, loginUser } = require("../controllers/auth.controller");

const router = express.Router();

router
  .get("/verify", Verify)
  .get("/users", getUsers)
  .get("/user/:id", getUser)
  .post("/signup", signupUser)
  .post("/login", loginUser)
  .put("/user", addUserMsg)
  .delete("/user/:id", deleteUser);

module.exports.userRoutes = router;
