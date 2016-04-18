/**
 * Type.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var elasticsearch = require('../services/elasticsearch');
elasticsearch.type = 'subtype';
module.exports = {

    attributes: {
        name: {
            type: 'string',
            notNull: true,
            unique: true
        },
    },
    index: function (subtype) {
        /*
        elasticsearch.index(subtype.id, {
            name: subtype.name
        });
        */
    },
    afterUpdate: function (subtype, cb) {
        this.index(subtype);
        cb();
    },
    afterCreate: function (subtype, cb) {
        this.index(subtype);
        cb();
    },
    afterDestroy: function (subtype, cb) {
        for (var i = 0; i < subtype.length; i++) {
            elasticsearch.delete(subtype[i].id);
        }
        cb();
    }
};
