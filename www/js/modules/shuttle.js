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

            var fetchRoutes = function(success, failure) {
                failure = failure || function (obj) {window.alert(obj.statusText||'An error occurred. Please try again.');};
                var xhr = new window.XMLHttpRequest();
                xhr.open('GET', 'http://apis.ucsf.edu/shuttle/routes');
                xhr.onload = function () {
                    success(JSON.parse(xhr.responseText));
                };
                xhr.onerror=failure;

                xhr.send(null);
            };

            fetchRoutes(
                function (data) {
                    $scope.loading = false;
                    $scope.routes = data.routes || [];
                    $scope.$apply();
                },
                function () {
                    $scope.loading = false;
                    $scope.loadError = true;
                }
                );

        }]
        );
}());