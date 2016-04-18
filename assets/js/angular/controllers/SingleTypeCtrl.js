app.controller('SingleTypeCtrl', ['$scope', '$http', '$location', '$routeParams', 'alertFactory', function ($scope, $http, $location, $routeParams, alertFactory) {
    $scope.cards = [];
    $scope.type = null;
    $http({
        method: 'GET',
        url: '/api/types?code=' + $routeParams.id,
    }).then(function (response) {
        if (response.status === 200) {
            if (response.data.length > 0) {
                $scope.type = response.data[0];
                $http({
                    method: 'GET',
                    url: '/api/cards?limit=10000&type=' + $scope.type.id,
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