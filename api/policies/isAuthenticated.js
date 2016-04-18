/**
 * isAuthorized
 *
 * @description :: Policy to check if user is authorized with JSON web token
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

var jwt = require('../services/jwt');

module.exports = function (req, res, next) {
  var token;
  if (!req.isSocket) {
    if (req.headers && req.headers.authorization) {
      var parts = req.headers.authorization.split(' ');
      if (parts.length == 2) {
        var scheme = parts[0];
        var credentials = parts[1];

        if (/^Bearer$/i.test(scheme)) {
          token = credentials;
        }
      } else {
        return res.json(401, {err: 'Format is Authorization: Bearer [token]'});
      }
    } else if (req.param('token')) {
      token = req.param('token');
      delete req.query.token;
    }

    if (token !== undefined) {
      jwt.verify(token, function (err, token) {
        if (err) {
          return res.json(401, {err: 'Invalid Token!'})
        }
        next();
      });
    } else {
      if (req.wantsJSON) {
        return res.json(401, {err: 'No Authorization header was found'});
      } else {
        if (req.isAuthenticated()) {
          return next();
        }
        else {
          return res.redirect('/login');
        }
      }
    }
  }else{
    return next();
  }
};
