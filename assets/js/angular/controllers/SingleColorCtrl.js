app.controller('SingleColorCtrl', ['$scope', '$http', '$location', '$routeParams', 'alertFactory', function ($scope, $http, $location, $routeParams, alertFactory) {
    $scope.cards = [];
    $scope.color = null;
    $http({
        method: 'GET',
        url: '/api/colors?code=' + $routeParams.id,
    }).then(function (response) {
        if (response.status === 200) {
            if (response.data.length > 0) {
                $scope.color = response.data[0];
                $http({
                    method: 'GET',
                    url: '/api/cards?limit=10000&color=' + $scope.color.id,
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