/**
 * Type.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var elasticsearch = require('../services/elasticsearch');
elasticsearch.type = 'type';
module.exports = {

    attributes: {
        name: {
            type: 'string',
            notNull: true,
            unique: true
        },
    },
    index: function (type) {
        /*
        elasticsearch.index(type.id, {
            name: type.name
        });
        */
    },
    afterUpdate: function (type, cb) {
        this.index(type);
        cb();
    },
    afterCreate: function (type, cb) {
        this.index(type);
        cb();
    },
    afterDestroy: function (type, cb) {
        for (var i = 0; i < type.length; i++) {
            elasticsearch.delete(type[i].id);
        }
        cb();
    }
};
