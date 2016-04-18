/**
 * SupertypeController
 *
 * @description :: Server-side logic for managing Supertypes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var importer = require('../services/importer');
module.exports = {

    import: function (req, res) {
        var key = 'supertypes'
        importer.path = "/v1/"+key;
        var keys = {
            name: 'name'
        };

        importer.run(key, keys, function (createdItem) {
            Supertype.create(createdItem).exec(function (err, created) {
            });
        });
        res.send();
    }
};

