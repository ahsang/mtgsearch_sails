

module.exports = {
    host: 'api.magicthegathering.io',
    path: '',
    run: function (model, keys, callback) {
        var http = require('http'), options = {
            host: this.host,
            port: 80,
            path: this.path,
            method: 'GET'
        };

        var webservice_data = "";

        var webservice_request = http.request(options, function (webservice_response) {
            webservice_response.on('error', function (e) {
                console.log(e.message);
            });
            webservice_response.on('data', function (chunk) {
                webservice_data += chunk;
            });
            webservice_response.on('end', function () {
                var data = JSON.parse(webservice_data);
                for (var i = 0; i < data[model].length; i++) {
                    var fetchedItem = data[model][i];
                    var item = {};

                    for (var key in keys) {
                        if(typeof fetchedItem === 'string'){
                            item[key] = fetchedItem;
                        }else {
                            if (fetchedItem[keys[key]] != undefined) {
                                if (typeof fetchedItem[keys[key]] === 'object' && fetchedItem[keys[key]].constructor !== Array) {
                                    fetchedItem[keys[key]] = JSON.stringify(fetchedItem[keys[key]]);
                                }

                                if (fetchedItem[keys[key]].constructor === Array) {
                                    if (fetchedItem[keys[key]].length === 1) {
                                        fetchedItem[keys[key]] = fetchedItem[keys[key]][0];
                                    } else {
                                        fetchedItem[keys[key]] = JSON.stringify(fetchedItem[keys[key]]);
                                    }
                                }
                                item[key] = fetchedItem[keys[key]];
                            }
                        }
                    }

                    callback(item);
                }

            });
        });

        webservice_request.end();
    }
}