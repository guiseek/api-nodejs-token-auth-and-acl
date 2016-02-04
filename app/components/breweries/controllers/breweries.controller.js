'use strict';

var mongoose = require('mongoose'),
    Brewery = require('../models/brewery.models');

exports.findAll = function (req, res) {
    Brewery.find({}).populate('user').exec(function (err, breweries) {
        res.json(breweries);
    });
};
exports.find = function (req, res) {
    res.json(req.brewery);
};
exports.create = function (req, res) {
    var brewery = new Brewery(req.body);

    brewery.save(function (err) {
        if (err) {
            return res.status(400).json({
                message: err
            });
        } else {
            res.json({
                message: 'Brewery created successfully',
                brewery: brewery
            });
        }
    });
};
exports.update = function (req, res) {
    console.log(req.brewery);
    var brewery = req.brewery;
    brewery.name = req.body.name;
    brewery.description = req.body.description;
    brewery.user = req.body.user;

    brewery.save(function (err) {
        if (err) {
            res.status(400).json({
                message: err
            });
        } else {
            res.json({
                message: 'Brewery updated successfully',
                brewery: brewery
            });
        }
    });
};
exports.delete = function (req, res) {
    var brewery = req.brewery;

    brewery.remove(function (err) {
        if (err) {
            res.status(400).json({
                message: err
            });
        } else {
            res.json({
                message: 'Brewery removed successfully',
                brewery: brewery
            });
        }
    });
};

exports.breweryByID = function (req, res, next, breweryId) {
    if (!mongoose.Types.ObjectId.isValid(breweryId)) {
        res.status(400).json({
            message: 'Brewery is invalid'
        });
    }
    Brewery.findById(breweryId).populate('user').exec(function (err, brewery) {
        if (err) return next(err);
        if (!brewery) return next(new Error('Failed to load Brewery ' + breweryId));
        req.brewery = brewery;
        next();
    });
};
