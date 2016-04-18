/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');
var jwt = require('../services/jwt');

module.exports = {
    _config: {
        actions: false,
        shortcuts: false,
        rest: false
    },

    login: function (req, res) {
        passport.authenticate('local', function (err, user, info) {
            if ((err) || (!user)) {
                res.status(401);
                return res.json(info);
            }
            req.logIn(user, function (err) {
                var hours = 1;
                var token = jwt.sign({user: user}, {expiresIn: hours + 'h'});
                var date = new Date();
                return res.json({
                    message: info.message,
                    user: user,
                    token: token,
                    expiress: (date.getTime() + (hours * 60 * 60 * 1000))
                });
            });

        })(req, res);
    }
};

