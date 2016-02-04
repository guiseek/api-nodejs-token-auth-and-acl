'use strict';

var acl = require('acl');

acl = new acl(new acl.memoryBackend());

exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/beers',
      permissions: '*'
    }, {
      resources: '/beers/:beerId',
      permissions: '*'
    }, {
      resources: '/beers/search/:query',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/beers',
      permissions: ['get','post']
    }, {
      resources: '/beers/:beerId',
      permissions: ['get','put','delete']
    }, {
      resources: '/api/beers/search/:query',
      permissions: ['get']
    }]
  }]);
};

exports.isAllowed = function (req, res, next) {
  var roles = (req.decoded) ? req.decoded.roles : ['guest'];
//   if (req.decoded._id == req.beer.user._id) {
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
          message: 'Beer is not authorized'
        });
      }
    }
  });
};
