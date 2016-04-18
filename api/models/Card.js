/**
 * Card.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var elasticsearch = require('../services/elasticsearch');
elasticsearch.type = 'card';
module.exports = {

    attributes: {
        name: {
            type: 'string',
            notNull: true
        },
        code: {
            type: 'string',
            notNull: true,
            unique: true
        },
        types: {
            type: 'string',
            notNull: true
        },
        colors: {
            type: 'string',
            notNull: true
        },
        cmc: {
            type: 'integer',
            notNull: true
        },
        cost: {
            type: 'string',
            notNull: true
        },
        text: {
            type: 'text',
            notNull: true
        },
        formats: {
            type: 'string',
            notNull: true
        }
    },
    index: function (card) {
        /*
        elasticsearch.index(card.id, {
            name: card.name,
            code: card.code,
            types: card.types,
            colors: card.colors,
            cmc: card.cmc,
            cost: card.cost,
            text: card.text,
            formats: card.formats
        });
        */
    },
    afterUpdate: function (card, cb) {
        this.index(card);
        cb();
    },
    afterCreate: function (card, cb) {
        this.index(card);
        cb();
    },
    afterDestroy: function (card, cb) {
        for (var i = 0; i < card.length; i++) {
            elasticsearch.delete(card[i].id);
        }
        cb();
    }
};

