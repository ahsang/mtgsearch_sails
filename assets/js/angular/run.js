app.run(function ($rootScope, $location, $localStorage, $route, ngTableFactory) {
    $rootScope.authRoutes = [];
    $rootScope.guestRoutes = [];
    var routes = $route.routes;
    check_token();

    function check_token(){
        if ($localStorage.expiress != undefined) {
            var date = new Date();
            if ($localStorage.expiress < date.getTime()) {
                $localStorage.$reset();
                $location.path('/');
            }
        }
    }

    for (var key in routes) {
        if (key.slice(-1) !== '/' && key !== '' && routes[key].redirectTo == undefined) {
            switch (routes[key].auth) {
                case true:
                    $rootScope.authRoutes.push(key);
                    break;
                case false:
                    $rootScope.guestRoutes.push(key);
                    break;
            }
        }
    }

    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        ngTableFactory.cachedData = [];
        var route = next.$$route;
        check_token();

        if (route != undefined) {
            switch (route.auth) {
                case true:
                    if ($rootScope.authRoutes.indexOf(route.originalPath) > -1 && $localStorage.token == undefined) {
                        $location.path('/');
                    }
                    break;
                case false:
                    if ($rootScope.guestRoutes.indexOf(route.originalPath) > -1 && $localStorage.token != undefined) {
                        $location.path('/');
                    }
                    break;
            }
        }
    });
});