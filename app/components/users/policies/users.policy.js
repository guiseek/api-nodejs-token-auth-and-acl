'use strict';

var acl = require('acl');

acl = new acl(new acl.memoryBackend());

exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/users',
      permissions: '*'
    }, {
      resources: '/users/:id',
      permissions: '*'
    }, {
      resources: '/users/search/:query',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/users',
      permissions: ['get','post']
    }, {
      resources: '/users/:id',
      permissions: ['get','put','delete']
    }, {
      resources: '/api/users/search/:query',
      permissions: ['get']
    }]
  }]);
};

exports.isAllowed = function (req, res, next) {
  var roles = (req.decoded) ? req.decoded.roles : ['guest'];
  if (req.user && req.decoded._id == req.user._id) {
    next();
  }

  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      res.status(500).json({message: 'Unexpected authorization error'});
    } else {
      if (isAllowed) {
        next();
      } else {
        res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
