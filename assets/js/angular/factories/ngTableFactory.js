app.factory("ngTableFactory", function ($http, $filter, $localStorage) {

    var ngTableFactory = {};

    function filterData(data, filter) {
        return $filter('filter')(data, filter)
    }

    function orderData(data, params) {
        return params.sorting() ? $filter('orderBy')(data, params.orderBy()) : filteredData;
    }

    function sliceData(data, params) {
        return data.slice((params.page() - 1) * params.count(), params.page() * params.count())
    }

    function transformData(data, filter, params) {
        return sliceData(orderData(filterData(data, filter), params), params);
    }

    ngTableFactory.cachedData = [];
    ngTableFactory.url = '';
    ngTableFactory.getData = function ($defer, params, filter) {
        if (ngTableFactory.cachedData.length > 0) {
            var filteredData = filterData(ngTableFactory.cachedData, filter);
            var transformedData = sliceData(orderData(filteredData, params), params);
            params.total(filteredData.length)
            $defer.resolve(transformedData);
        }
        else {
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + $localStorage.token;
            $http.get(ngTableFactory.url).success(function (resp) {
                angular.copy(resp, ngTableFactory.cachedData)
                params.total(resp.length)
                var filteredData = $filter('filter')(resp, filter);
                var transformedData = transformData(resp, filter, params)

                $defer.resolve(transformedData);
            });
        }

    }

    return ngTableFactory;
});