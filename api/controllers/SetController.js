/**
 * SetController
 *
 * @description :: Server-side logic for managing sets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var importer = require('../services/importer');
module.exports = {

    import: function (req, res) {
        var key = 'sets'
        importer.path = "/v1/"+key;
        var keys = {
            name: 'name',
            code: 'code',
            type: 'type',
            border: 'border',
            releaseDate: 'releaseDate'
        };

        importer.run(key, keys, function (createdItem) {
            Set.create(createdItem).exec(function (err, created) {
            });
        });
        res.send();
    }
};

