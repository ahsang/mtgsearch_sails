app.factory('alertFactory', function ($rootScope) {
    var alertFactory = {};

    $rootScope.alerts = [];

    alertFactory.add = function (type, msg) {
        if (type === 'error') {
            type = 'danger';
        }

        for (var i = 0; i < $rootScope.alerts.length; i++) {
            if ($rootScope.alerts[i].type == type) {
                alertFactory.closeAlert($rootScope.alerts[i]);
            }
        }

        $rootScope.alerts.push({
            type: type, msg: msg, close: function () {
                return alertFactory.closeAlert(this);
            }
        });
    };

    alertFactory.closeAlert = function (alert) {
        var index = $rootScope.alerts.indexOf(alert);
        $rootScope.alerts.splice(index, 1);
    };

    return alertFactory;
});