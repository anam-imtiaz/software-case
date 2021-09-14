const config = require("../../config/auth");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};
exports.create = (req, res) => {
 const objTask = new User({
    email: 'admin01@gmail.com',
    password: '$2a$12$gQ27rFC1wUPkVuDQtpXWQOSt3YGzOWKJxHF2aPDyjF2RV9zgeGlVe',
    first_name: 'Admin',
    last_name: 'Name',
  });

  objTask
    .save(objTask)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tasks."
      });
    });
};
exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return; 
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

     
      res.status(200).send({
        id: user._id,
        email: user.email,
        first_name: user.first_name,
       last_name: user.last_name,
        accessToken: token
      });
    });
};
