app.controller('SignuUpInCtrl', ['$scope', '$http', '$location', 'alertFactory', '$localStorage', function ($scope, $http, $location, alertFactory, $localStorage) {
    function signIn(){
        $http({
            method: 'POST',
            url: 'api/login',
            data: {
                username: $scope.username,
                password: $scope.password
            }
        }).then(function (response) {
            $localStorage.token = response.data.token;
            $localStorage.expiress = response.data.expiress;
            response.data.user.username = $scope.username;
            $localStorage.user = response.data.user;
            $location.path('/');
            alertFactory.add("success", response.data.message);
        }, function (response) {
            alertFactory.add("error", response.data.message);
        });
    }


    $scope.signin = function () {
        if ($scope.signinForm.$valid) {
            signIn();
        } else {
            for (var key in $scope.signinForm.$error) {
                $scope.signinForm.$error[key][0].$setTouched();
            }
        }
    };
    $scope.signup = function () {
        if ($scope.signupForm.$valid) {
            $http({
                method: 'POST',
                url: 'api/users',
                data: {
                    username: $scope.username,
                    password: $scope.password,
                    email: $scope.email
                }
            }).then(function (response) {
                if (response.status === 201) {
                    signIn();
                }
            }, function (response) {
                if (response.status === 400) {
                    var data = response.data;
                    for (var key in data) {
                        var message = data[key][0].message;
                        message = message.charAt(0).toUpperCase() + message.slice(1);
                        alertFactory.add("error", message);
                        break;
                    }
                } else {
                    alertFactory.add("error", 'Something whent wrong please try agian.');
                }
            });
        } else {
            for (var key in $scope.signupForm.$error) {
                $scope.signupForm.$error[key][0].$setTouched();
            }
        }
    };
}]);