const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateTokens } = require('../utils/generateTokens');

module.exports.registerUser = async function (req, res) {
    try {
      let { fullname, email, password } = req.body;
      let user = await userModel.findOne({ email });
      if (user) return res.status(401).send("User already exists");
      bcrypt.genSalt(10, function (err, salt) {
        if (err) return res.send(err.message);
        bcrypt.hash(password, salt, async function (err, hash) {
          if (err) return res.send(err.message);
          let user = await userModel.create({
            fullname,
            email,
            password: hash,
          });
  
          let token = generateTokens(user);
          res.cookie("token", token);
          res.send("User created successfully");
        });
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

module.exports.loginUser = async function() {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) return res.status(401).send("email or password is incorrect");
    
    bcrypt.compare(password, user.password, function (err, result) {
        if (result){
            let token = generateTokens(user);
            res.cookie("token", token);
            res.send("User logged in successfully");
        } 
        else {
            res.status(401).send("email or password is incorrect");
        }
    })
};

module.exports.logout = function(req, res) {
    res.clearCookie("token", "");
    res.redirect("/");
};