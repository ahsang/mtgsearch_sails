/**
 * CardController
 *
 * @description :: Server-side logic for managing Cards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var importer = require('../services/importer');
module.exports = {

    import: function (req, res) {
        var page = req.param('page', 1) + "";
        importer.path = "/v1/cards?page=" + page + "&pageSize=50";
        var keys = {
            name: 'name',
            code: 'multiverseid',
            types: 'type',
            cost: 'manaCost',
            cmc: 'cmc',
            text: 'originalText',
            formats: 'legalities',
            colors: 'colors'
        };

        importer.run('cards', keys, function (createdCard) {
            Card.create(createdCard).exec(function (err, created) {
            });
        });
        res.send();
    }
};

