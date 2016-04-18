app.controller('PackCtrl',
    ['$scope', '$http', '$location', 'ngTableParams', 'ngTableFactory', 'alertFactory',
        function ($scope, $http, $location, ngTableParams, ngTableFactory, alertFactory) {
            var single = 'pack';
            var url = '/api/' + single + 's';
            ngTableFactory.url = url;
            $scope.data = ngTableFactory.cachedData;
            $scope.currentItem = null;
            $scope.isUpdate = false;
            $scope.cycles = [];

            $http({
                method: 'GET',
                url: '/api/cycles',
            }).then(function (response) {
                if (response.status === 200) {
                    $scope.cycles = response.data;
                }
            }, function (response) {
            });

            $scope.tableParams = new ngTableParams(
                {
                    page: 1,
                    count: 10,
                    sorting: {name: 'asc'}
                },
                {
                    counts: 10,
                    total: 0,
                    getData: function ($defer, params) {
                        ngTableFactory.getData($defer, params, $scope.filter);
                    }
                }
            );

            $scope.remove = function (item) {
                $http({
                    method: 'DELETE',
                    url: url + '/' + item.id,
                }).then(function (response) {
                    if (response.status === 200) {
                        for (var key in $scope.data) {
                            var currentItem = $scope.data[key];
                            if (item.code === currentItem.code) {
                                delete  $scope.data[key];
                                $scope.tableParams.reload();
                                break;
                            }
                        }
                        alertFactory.add("success", item.code + ' has been deleted.');
                        return;
                    }
                    alertFactory.add("error", item.code + ' could not be deleted, please try agian.');
                }, function (response) {
                    alertFactory.add("error", item.code + ' could not be deleted, please try agian.');
                });
            }

            $scope.update = function (item) {
                var currentItem = angular.copy(item);
                for (var key in currentItem) {
                    if (typeof currentItem[key] === 'object') {
                        currentItem[key] = currentItem[key].id;
                    }
                }
                $scope.currentItem = currentItem;
                $scope.isUpdate = true;
            }

            $scope.cancel = function () {
                $scope.isUpdate = false;
                $scope.currentItem = null;
            }

            $scope.createOrUpdate = function () {
                var createOrUpdateUrl = url;
                var method = 'POST';
                if ($scope.isUpdate) {
                    createOrUpdateUrl += '/' + $scope.currentItem.id;
                    delete $scope.currentItem.id;
                    method = 'PUT';
                }

                $http({
                    method: method,
                    url: createOrUpdateUrl,
                    data: $scope.currentItem
                }).then(function (response) {

                    var message = 'A new ' + single + ' have been created.';
                    var item = response.data;

                    if ($scope.isUpdate) {
                        for (var key in $scope.data) {
                            var currentItem = $scope.data[key];
                            if (item.code === currentItem.code) {
                                $scope.data[key] = item;
                                message = item.code + ' has been updated.';
                                break;
                            }
                        }
                    } else {
                        $scope.data.push(item);
                    }

                    $scope.tableParams.reload();
                    alertFactory.add("success", message);
                    $scope.currentItem = undefined;
                    $scope.submitted = false;
                    $scope.isUpdate = false;
                }, function (response) {
                    var message = 'Something whent wrong when you tried to create a ' + single + '.';

                    if ($scope.update) {
                        message = 'Something whent wrong when you tried to update ' + $scope.currentItem.code + '.';
                    }

                    alertFactory.add("error", message);
                });
            }

            $scope.$watch("filter.$", function () {
                $scope.tableParams.reload();
            });

        }
    ]
);