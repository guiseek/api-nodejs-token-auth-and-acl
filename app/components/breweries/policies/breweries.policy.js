'use strict';

var acl = require('acl');

acl = new acl(new acl.memoryBackend());

exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/breweries',
      permissions: '*'
    }, {
      resources: '/breweries/:breweryId',
      permissions: '*'
    }, {
      resources: '/breweries/search/:query',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/breweries',
      permissions: ['get','post']
    }, {
      resources: '/breweries/:breweryId',
      permissions: ['get','put','delete']
    }, {
      resources: '/api/breweries/search/:query',
      permissions: ['get']
    }]
  }]);
};

exports.isAllowed = function (req, res, next) {
  var roles = (req.decoded) ? req.decoded.roles : ['guest'];
//   if (req.decoded._id == req.brewery.user._id) {
//     next();
//   }

    console.log(roles);
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      res.status(500).json({message: 'Unexpected authorization error'});
    } else {
      if (isAllowed) {
        next();
      } else {
        res.status(403).json({
          message: 'Brewery is not authorized'
        });
      }
    }
  });
};
