/**
 * Type.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var elasticsearch = require('../services/elasticsearch');
elasticsearch.type = 'set';
module.exports = {

    attributes: {
        code: {
            type: 'string',
            notNull: true,
            unique: true
        },
        name: {
            type: 'string',
            notNull: true
        },
        border: {
            type: 'string',
            notNull: true
        },
        type: {
            type: 'string',
            notNull: true
        },
        releaseDate: {
            type: 'datetime',
            notNull: true
        }
    },
    index: function (set) {
        /*
         elasticsearch.index(set.id, {
         code: set.code,
         name: set.name,
         border: set.border,
         type: set.type
         releaseDate: set.releaseDate
         });
         */
    },
    afterUpdate: function (set, cb) {
        this.index(set);
        cb();
    },
    afterCreate: function (set, cb) {
        this.index(set);
        cb();
    },
    afterDestroy: function (set, cb) {
        for (var i = 0; i < set.length; i++) {
            elasticsearch.delete(set[i].id);
        }
        cb();
    }
};
