(function () {
    'use strict';
    angular.module('shuttle', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/shuttle/list', {templateUrl: 'shuttle', controller: 'routeMenuShuttleController'});
    }])
    .controller(
        'routeMenuShuttleController',
        ['$scope', '$timeout', function ($scope, $timeout) {
            $scope.loading = true;

            var callback = function () {
                $scope.loading = false;
                $scope.routes = [
                    {name: 'Blue'},
                    {name: 'Yellow'},
                    {name: 'Not Green'}
                ];
            };

            // Using $timeout to sort of fake an XHR just to rule out XHR as a cause
            $timeout(callback, 500);
        }]
    );
}());