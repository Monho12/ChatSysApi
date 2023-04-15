const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models/user.model");
require("dotenv").config();

exports.signupUser = async (req, res) => {
  const { passwordConfirm, username, password } = req.body;
  const checkUsername = await User.findOne({ username }, { password: 0 });
  if (password === passwordConfirm) {
    try {
      if (checkUsername)
        return res.status(401).send("Username is already in use");
      if (!username || !password)
        return res.status(401).send("Username & Password not found!");

      const encryptedPassword = await bcrypt.hash(password, 10);
      const user = await new User({
        username,
        password: encryptedPassword,
      }).save();
      const token = jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      res.send(token);
    } catch (err) {
      res.status(403);
    }
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user) {
    console.log(user);
    try {
      const isEqaul = await bcrypt.compare(password, user.password);
      if (isEqaul) {
        const token = jwt.sign({ user }, process.env.JWT_SECRET, {
          expiresIn: "24h",
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

exports.Verify = async (req, res) => {
  if (req.headers.authorization) {
    try {
      await jwt.verify(
        req.headers.authorization,
        process.env.JWT_SECRET,
        async (error, item) => {
          if (!error) {
            const user = await User.findById(item.user._id)
              .populate("Message")
              .populate("Posts");
            console.log(user);
            res.send(user);
          }
        }
      );
    } catch (error) {
      res.status(401);
    }
  } else {
    res.status(404).send("Authentication required");
  }
};
