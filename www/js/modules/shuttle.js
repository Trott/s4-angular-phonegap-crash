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

            $scope.load = function () {
                UCSF.Shuttle.routes(
                    {},
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
            };

            $scope.load();
        }]
    );
}());