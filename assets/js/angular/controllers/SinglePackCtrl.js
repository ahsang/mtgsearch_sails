app.controller('SinglePackCtrl', ['$scope', '$http', '$location', '$routeParams', 'alertFactory', function ($scope, $http, $location, $routeParams, alertFactory) {
    $scope.cards = [];
    $scope.pack = null;
    $http({
        method: 'GET',
        url: '/api/packs?code=' + $routeParams.id,
    }).then(function (response) {
        if (response.status === 200) {
            if (response.data.length > 0) {
                $scope.pack = response.data[0];
                $http({
                    method: 'GET',
                    url: '/api/cards?limit=10000&pack=' + $scope.pack.id,
                }).then(function (response) {
                    if (response.status === 200) {
                        if (response.data.length > 0) {
                            $scope.cards = response.data;
                        } else {
                            $location.path('/');
                            alertFactory.add("error", $routeParams.id + ' does not exists.');
                        }
                    }
                }, function (response) {
                });
            } else {
                $location.path('/');
                alertFactory.add("error", $routeParams.id + ' does not exists.');
            }
        }
    }, function (response) {
    });
}]);