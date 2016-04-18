/**
 * TypeController
 *
 * @description :: Server-side logic for managing Types
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var importer = require('../services/importer');
module.exports = {

    import: function (req, res) {
        var key = 'types'
        importer.path = "/v1/"+key;
        var keys = {
            name: 'name'
        };

        importer.run(key, keys, function (createdItem) {
            Type.create(createdItem).exec(function (err, created) {
            });
        });
        res.send();
    }
};

