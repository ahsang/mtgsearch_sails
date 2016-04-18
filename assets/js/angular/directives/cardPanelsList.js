app.directive('cardPanelsList', function () {
    return {
        restrict: 'E',
        scope: {
            loaded: '=?loads',
            cards: '=',
            message: '=?'
        },
        templateUrl: '../partials/directives/cardPanelsList.html',
        link: function (scope, element, attrs) {

            if (scope.loaded === undefined) {
                scope.loaded = 10;
            }

            if (scope.message === undefined) {
                scope.message = '';
            }

            var defaultToLoad = angular.copy(scope.loaded);

            scope.$watch('cards', function () {
                scope.loaded = defaultToLoad;
            });

            scope.loadMore = function () {
                scope.loaded += defaultToLoad;
            }
        }
    };
});