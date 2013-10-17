(function () {
    'use strict';
    angular.module('shuttle', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/shuttle/list', {templateUrl: 'shuttle/routeList.html', controller: 'routeMenuShuttleController'});
    }])
    .controller(
        'routeMenuShuttleController',
        ['$scope', function ($scope) {
            $scope.loading = true;
            $scope.loadError = false;

            var failure = function () {
                $scope.loading = false;
                $scope.loadError = true;
            };

            var success = function (data) {
                $scope.loading= false;
                $scope.routes = data.routes || [];
            };

            var xhr = new window.XMLHttpRequest();
            xhr.open('GET', 'http://apis.ucsf.edu/shuttle/routes');
            xhr.onload = function () {
                try {
                    success(JSON.parse(xhr.responseText));
                } catch (e) {
                    failure();
                }
                $scope.$apply();
            };
            xhr.onerror=failure;

            xhr.send(null);
        }]
    );
}());