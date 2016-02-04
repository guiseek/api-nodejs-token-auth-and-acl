'use strict';

var mongoose = require('mongoose'),
    Beer = require('../models/beer.models');

exports.findAll = function (req, res) {
    Beer.find({}).populate('user').populate('brewery').exec(function (err, beers) {
        res.json(beers);
    });
};
exports.find = function (req, res) {
    res.json(req.beer);
};
exports.create = function (req, res) {
    var beer = new Beer(req.body);

    beer.save(function (err) {
        if (err) {
            return res.status(400).json({
                message: err
            });
        } else {
            res.json({
                message: 'Beer created successfully',
                beer: beer
            });
        }
    });
};
exports.update = function (req, res) {
    console.log(req.beer);
    var beer = req.beer;
    beer.name = req.body.name;
    beer.description = req.body.description;
    beer.brewery = req.body.brewery;
    beer.user = req.body.user;

    beer.save(function (err) {
        if (err) {
            res.status(400).json({
                message: err
            });
        } else {
            res.json({
                message: 'Beer updated successfully',
                beer: beer
            });
        }
    });
};
exports.delete = function (req, res) {
    var beer = req.beer;

    beer.remove(function (err) {
        if (err) {
            res.status(400).json({
                message: err
            });
        } else {
            res.json({
                message: 'Beer removed successfully',
                beer: beer
            });
        }
    });
};

exports.beerByID = function (req, res, next, beerId) {
    if (!mongoose.Types.ObjectId.isValid(beerId)) {
        res.status(400).json({
            message: 'Beer is invalid'
        });
    }
    Beer.findById(beerId).populate('user').populate('brewery').exec(function (err, beer) {
        if (err) return next(err);
        if (!beer) return next(new Error('Failed to load Beer ' + beerId));
        req.beer = beer;
        next();
    });
};
