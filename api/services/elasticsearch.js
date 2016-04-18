var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200',
});

var index = "mtgsearch";
module.exports = {
    type: '',
    index: function (id, document) {
        return client.index({
            index: index,
            type: this.type,
            id: id,
            body: document
        });
    },
    get: function (id) {
        return client.get({
            index: index,
            type: this.type,
            id: id
        });
    },
    delete: function (id) {
        return client.delete({
            index: index,
            type: this.type,
            id: id
        });
    },
    search: {
        size: 20,
        sort: '',
        from: 0,
        fields: '',
        type: '',
        reset: function () {
            this.size = 20;
            this.sort = '';
            this.from = 0;
            this.fields = '';
            this.type = '';
        },
        search: function () {
            var searchObj = {
                index: index,
                type: this.type,
                size: this.size,
                sort: this.sort,
                from: this.from,
                fields: this.fields
            };

            return client.search(searchObj);
        }
    }
}