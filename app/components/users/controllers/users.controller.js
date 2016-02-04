'use strict';

var mongoose = require('mongoose'),
    User = require('../models/user.models');

exports.findAll = function (req, res) {
    User.find({}, '-password', function (err, users) {
        res.json(users);
    });
};
exports.find = function (req, res) {
    res.json(req.user);
};
exports.create = function (req, res) {
    var user = req.body;
    if (user.roles.length == 0) {
        user.roles = ['user'];
    }
    var user = new User(user);

    user.save(function (err) {
        if (err) {
            return res.status(400).json({
                message: err
            });
        } else {
            res.json({
                message: 'User created successfully',
                user: user
            });
        }
    });
};
exports.update = function (req, res) {
    var user = req.user;
    user.name = req.body.name;
    user.username = req.body.username;
    user.email = req.body.email;
    user.roles = req.body.roles;
    if (req.body.password) {
        user.password = req.body.password;
    }

    user.save(function (err) {
        if (err) {
            res.status(400).json({
                message: err
            });
        } else {
            res.json({
                message: 'User updated successfully',
                user: user
            });
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

exports.userByID = function (req, res, next, userId) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({
            message: 'User is invalid'
        });
    }
    User.findById(userId, function (err, user) {
        if (err) return next(err);
        if (!user) return next(new Error('Failed to load Brewery ' + userId));
        req.user = user;
        next();
    });
};
