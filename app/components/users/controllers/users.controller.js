'use strict';

var mongoose = require('mongoose'),
  User = require('../models/user.models');

exports.findAll = function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
};
exports.find = function (req, res) {
  res.json(req.user);
};
exports.create = function (req, res) {
  var user = new User(req.body);

  user.save(function (err) {
    if (err) {
      return res.status(400).json({
        message: err
      });
    } else {
      res.json(user);
    }
  });
};
exports.update = function (req, res) {
  var user = req.user;
  user.name = req.body.name;
  user.username = req.body.username;
  user.password = req.body.password;
  user.email = req.body.email;
  user.roles = req.body.roles;

  user.save(function (err) {
    if (err) {
      res.status(400).json({
        message: err
      });
    } else {
      res.json(user);
    }
  });
};
exports.delete = function (req, res) {
  var user = req.user;

  user.remove(function (err) {
    if (err) {
      res.status(400).json({
        message: err
      });
    } else {
      res.json({
        message: 'User removed successfully',
        user: user
      });
    }
  });
};

exports.userByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
      message: 'User is invalid'
    });
  }

  User.findById(id, function (err, user) {
    if (err) {
      next(err);
    } else if (!user) {
      res.status(404).json({
        message: 'No user with that identifier has been found'
      });
    }
    req.user = user;
    next();
  });
};
