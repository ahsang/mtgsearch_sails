/**
 * ImageController
 *
 * @description :: Server-side logic for managing images
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var fs = require('fs');
var request = require('request');

module.exports = {
    _config: {
        actions: false,
        shortcuts: false,
        rest: false
    },

    downloadFile: function (uri, fileName, done) {
        if (!fs.existsSync(fileName)) {
            request.head(uri, function (err, res, body) {
                request(uri).pipe(fs.createWriteStream(fileName)).on('close', done);
            });
        } else {
            done();
        }
    },

    get: function (req, res) {
        var imagePath = './assets/images/' + req.param('code') + '.png';
        this.downloadFile('http://thronesdb.com/bundles/cards/' + req.param('code') + '.png', imagePath, function () {
            fs.readFile(imagePath, function read(err, data) {
                if (err) {
                    throw err;
                }

                res.set('Content-Type', 'image/png');
                res.send(data);
            });
        });
    }
};

