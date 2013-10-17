(function () {
    'use strict';
    angular.module('main', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/', {templateUrl: 'main', controller: 'mainController'})
        .otherwise({redirectTo: '/'});
    }])
    .controller(
        'mainController',
        ['$scope', '$timeout', function ($scope, $timeout) {
            $scope.loading = true;

            var callback = function () {
                $scope.loading = false;
            };

            $timeout(callback, 1000);
        }]
    );
}());