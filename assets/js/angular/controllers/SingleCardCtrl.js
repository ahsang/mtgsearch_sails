app.controller('SingleCardCtrl', ['$scope', '$http', '$location', '$routeParams', 'alertFactory', function ($scope, $http, $location, $routeParams, alertFactory) {
    $scope.card = null;
    $http({
        method: 'GET',
        url: '/api/cards?code=' + $routeParams.id,
    }).then(function (response) {
        if (response.status === 200) {
            if (response.data.length > 0) {
                $scope.card = response.data[0];
            } else {
                $location.path('/');
                alertFactory.add("error", $routeParams.id + ' does not exists.');
            }
        }
    }, function (response) {
    });
}]);

app.filter('unsafe', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
});

app.filter('parsetext', function () {
    return function (val) {
        if (val != undefined) {
            val = val.replace(/\[(.+?)\]/g, function ($0, $1) {
                return '<span class="icon-' + $1 + '"></span>';
            });

            val = val.split('<b>');
            val = val.join('<b><p>');
            val = '<p>' + val + '</p>';
        }
        return val;
    };
});