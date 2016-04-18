/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var password_hash = require('password-hash');

module.exports = {

  attributes: {
    username: {
      type: 'string',
      unique: true,
      required: true
    },
    email: {
      type: 'string',
      unique: true,
      email: true,
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    isActive: {
      type: 'boolean',
      defaultsTo: false
    },
    role: {
      type: 'integer',
      defaultsTo: 0,
      min: 0
    },
    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },

  beforeCreate: function (user, cb) {
    var hash = password_hash.generate(user.password);
    user.password = hash;
    cb();
  }

};

