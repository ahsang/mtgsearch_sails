app.controller('HomeCtrl', ['$scope', '$http', 'alertFactory', function ($scope, $http, alertFactory) {
    $scope.cards = [];
    $scope.packs = [];
    $scope.types = [];
    $scope.colors = [];

    $http({
        method: 'GET',
        url: '/api/colors',
    }).then(function (response) {
        if (response.status === 200) {
            $scope.colors = response.data;
        }
    });

    $http({
        method: 'GET',
        url: '/api/packs',
    }).then(function (response) {
        if (response.status === 200) {
            $scope.packs = response.data;
        }
    });

    $http({
        method: 'GET',
        url: '/api/types',
    }).then(function (response) {
        if (response.status === 200) {
            $scope.types = response.data;
        }
    });


    function getUrlParts() {
        var urlParts = [];

        if ($scope.search.value !== undefined && $scope.search.value !== null && $scope.search.value.length) {
            urlParts.push('"name":{"contains":"' + $scope.search.value + '"}');
        }

        if ($scope.search.color !== undefined && $scope.search.color !== null && $scope.search.color.length) {
            urlParts.push('"color": ' + $scope.search.color);
        }

        if ($scope.search.type !== undefined && $scope.search.type !== null && $scope.search.type.length) {
            urlParts.push('"type": ' + $scope.search.type);
        }

        if ($scope.search.pack !== undefined && $scope.search.pack !== null && $scope.search.pack.length) {
            urlParts.push('"pack":' + $scope.search.pack);
        }

        return urlParts.join(', ');
    }

    $scope.search = function () {
        var url = '/api/cards?limit=10000&where={' + getUrlParts() + '}';

        $http({
            method: 'GET',
            url: url,
        }).then(function (response) {
            if (response.status === 200) {
                $scope.cards = response.data;
            } else {
                $scope.cards = [];
            }
        }, function (response) {
            $scope.cards = [];
        });
    }
}]);