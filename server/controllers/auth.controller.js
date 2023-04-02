const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models/user.model");
require("dotenv").config();

const signupUser = async (req, res) => {
  const { password, passwordConfirm, username } = req.body;
  const exist = await User.findOne({ username });
  if (!exist) {
    if (username && password && passwordConfirm) {
      if (password === passwordConfirm) {
        try {
          const encrypted = await bcrypt.hash(password, 10);
          const user = await new User({
            username,
            password: encrypted,
          }).save();
          res.send(user);
        } catch (err) {
          res.status(403);
        }
      }
    } else {
      res.status(401);
    }
  } else {
    res.status(401).send("Username is already in use");
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user) {
    console.log(user);
    try {
      const isEqaul = await bcrypt.compare(password, user.password);
      if (isEqaul) {
        const token = jwt.sign({ user }, process.env.JWT_SECRET, {
          expiresIn: "30min",
        });
        res.send(token);
      } else {
        res.status(401).send("username or password wrong");
      }
    } catch (err) {
      res.status(403);
    }
  } else {
    res.status(404).send("No account found");
  }
};

module.exports = { loginUser, signupUser };
