'use strict';

var jwt = require('jsonwebtoken'),
  User = require('../models/user.models');

var secret = 'api-simple';

exports.setup = function(req, res) {
  var demo = new User({
    name: 'Demo',
    username: 'demo',
    password: 'demo',
    email: 'demo@demo.com',
    roles: ['admin']
  });
  demo.save(function(err) {
    if (err) throw err;
    res.status(200).json({ message: 'User saved successfully', user: demo });
  });
};
exports.signin = function(req, res) {
  if (!req.body.username) {
    res.status(400).json({ message: 'Username required'});
    return;
  }
  if (!req.body.password) {
    res.status(400).json({ message: 'Password required'});
    return;
  }
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) {
      res.status(500).json({ message: err});
      return;
    }
    if (!user) {
      res.status(401).json({ message: 'Authentication failed, try again.'});
      return;
    }
    user.comparePassword(req.body.password, function(err, valid) {
      if (err) {
        res.status(500).json({ message: err});
        return;
      }
      if (!valid) {
        res.status(401).json({ message: 'Authentication failed, try again.'});
        return;
      }
      var token = jwt.sign(user, secret);
      res.status(200).json({
        user: user,
        token: token,
        rememberme: req.body.rememberme
      });
    });
  });
};
exports.verify = function(req, res, next) {
  var token = req.body.token || req.params.token || req.headers['authorization'];
  if (token) {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(400).json({ message: 'Failed to authenticate token.' });
        // return;
      } else {
        req.decoded = decoded._doc;
        next();
      }
    });
  } else {
    res.status(403).json({
      message: 'No token provided.'
    });
  }
};
