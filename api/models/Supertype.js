/**
 * Type.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var elasticsearch = require('../services/elasticsearch');
elasticsearch.type = 'supertype';
module.exports = {

    attributes: {
        name: {
            type: 'string',
            notNull: true,
            unique: true
        },
    },
    index: function (supertype) {
        /*
        elasticsearch.index(supertype.id, {
            name: supertype.name
        });
        */
    },
    afterUpdate: function (supertype, cb) {
        this.index(supertype);
        cb();
    },
    afterCreate: function (supertype, cb) {
        this.index(supertype);
        cb();
    },
    afterDestroy: function (supertype, cb) {
        for (var i = 0; i < supertype.length; i++) {
            elasticsearch.delete(supertype[i].id);
        }
        cb();
    }
};
