var jwtToken = require('jsonwebtoken');
module.exports = {
    verify: function (token, callback) {
        jwtToken.verify(token, sails.config.session.secret, {}, callback);
    },
    sign: function (data, settings) {
        return jwtToken.sign(data, sails.config.session.secret, settings);
    }
}