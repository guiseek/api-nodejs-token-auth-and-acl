'use strict';

var jwt = require('jsonwebtoken'),
  User = require('../models/user.models');

var secret = 'api-simple';

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
    if (err) throw err;
    if (!user) {
      res.status(404).json({ message: 'Authentication failed, try again.'});
      return;
    }
    if (user.password != req.body.password) {
      res.status(401).json({ message: 'Authentication failed, try again.'});
      return;
    }
    var token = jwt.sign(user, secret);
    res.json({
      user: user,
      secret: secret,
      token: token
    });
  });
};
exports.verify = function(req, res, next) {
  var token = req.body.token || req.params.token || req.headers['authorization'];
  if (token) {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(400).json({ message: 'Failed to authenticate token.' });
        return;
      }
      req.decoded = decoded;
      next();
    });
  } else {
    res.status(403).json({
      message: 'No token provided.'
    });
  }
};
