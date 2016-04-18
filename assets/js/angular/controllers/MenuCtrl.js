app.controller('MenuCtrl', ['$scope', '$http', '$location', '$localStorage', 'alertFactory', function ($scope, $http, $location, $localStorage, alertFactory) {
    $scope.menuClass = function (page) {
        var current = $location.path().substring(1);
        return page === current ? "active" : "";
    };

    $scope.authenticated = function () {
        if ($localStorage.token != undefined) {
            return true;
        }
        return false;
    }

    $scope.signout = function () {
        $localStorage.$reset();
        $location.path('/');
        alertFactory.add("success", 'You are no logged out.');
    }
}]);