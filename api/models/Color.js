/**
 * Type.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var elasticsearch = require('../services/elasticsearch');
elasticsearch.type = 'color';
module.exports = {

    attributes: {
        name: {
            type: 'string',
            notNull: true,
            unique: true
        },
    },
    index: function (color) {
        /*
        elasticsearch.index(color.id, {
            name: color.name
        });
        */
    },
    afterUpdate: function (color, cb) {
        this.index(color);
        cb();
    },
    afterCreate: function (color, cb) {
        this.index(color);
        cb();
    },
    afterDestroy: function (color, cb) {
        for (var i = 0; i < color.length; i++) {
            elasticsearch.delete(color[i].id);
        }
        cb();
    }
};
