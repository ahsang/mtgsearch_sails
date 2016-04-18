app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    $routeProvider.
        when('/', {
            templateUrl: 'partials/index.html',
            controller: 'HomeCtrl'
        }).
        when('/signup', {
            templateUrl: 'partials/signup.html',
            controller: 'SignuUpInCtrl',
            auth: false
        }).
        when('/signin', {
            templateUrl: 'partials/signin.html',
            controller: 'SignuUpInCtrl',
            auth: false
        }).
        when('/users', {
            templateUrl: 'partials/user.html',
            controller: 'UserCtrl',
            auth: true
        }).
        when('/colors', {
            templateUrl: 'partials/color.html',
            controller: 'ColorCtrl',
            auth: true
        }).
        when('/colors/:id', {
            templateUrl: 'partials/single_color.html',
            controller: 'SingleColorCtrl'
        }).
        when('/cycles', {
            templateUrl: 'partials/cycle.html',
            controller: 'CycleCtrl',
            auth: true
        }).
        when('/types', {
            templateUrl: 'partials/type.html',
            controller: 'TypeCtrl',
            auth: true
        }).
        when('/types/:id', {
            templateUrl: 'partials/single_type.html',
            controller: 'SingleTypeCtrl'
        }).
        when('/packs', {
            templateUrl: 'partials/pack.html',
            controller: 'PackCtrl',
            auth: true
        }).
        when('/packs/:id', {
            templateUrl: 'partials/single_pack.html',
            controller: 'SinglePackCtrl'
        }).
        when('/cards', {
            templateUrl: 'partials/card.html',
            controller: 'CardCtrl',
            auth: true
        }).
        when('/cards/:id', {
            templateUrl: 'partials/single_card.html',
            controller: 'SingleCardCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
}]);