require('dotenv').config();
var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const {body, validationResult } = require("express-validator");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const validateToken = require("../auth/validateToken.js")
const multer = require("multer")
const storage = multer.memoryStorage();
const upload = multer({storage})


/* GET users listing. */
router.get('/list', validateToken, (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) return next(err);
    res.json(users);
  })
});

router.get('/listx', (req, res) => {
  User.find({}, (err, users) => {
    console.log(users);
  })
  res.json({status: "ok"})
});

router.post('/login', upload.none(), (req, res, next) => {
  console.log(req.body);

  User.findOne({username: req.body.username}, (err, user) => {
    if (err) throw err;
    if(!user) {
      return res.status(403).json({message: "Login failed :("});
    } else {
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) throw err;
        if(isMatch) {
          const jwtPayload = {
            id: user._id,
            username: user.username
          }
          console.log(process.env.SECRET)
          jwt.sign(
            jwtPayload,
            process.env.SECRET,
            {
              expiresIn: 120
            },
            (err, token) => {
              console.log(err)
              res.json({success: true, token});
            }
          );
        } else {
          return res.status(403).json({message: "Login failed :("});
        }
      })
    }
  })

  //for debugging
  console.log("All users:")
  User.find({}).exec(function(err, users) {
    if (err) throw err;
    console.log(users);
  }); 
});

router.get('/register', (req, res, next) => {

});

router.post("/register",
  body("username").isLength({ min: 3 }).trim().escape(),
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findOne({ username: req.body.username });

      if (user) {
        return res.status(403).json({ username: "Username already in use." });
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);

      await User.create({
        username: req.body.username,
        email: req.body.email,
        password: hash,
      });

      return res.redirect("/login");
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = router;
