(function () {
    'use strict';
    angular.module('list', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/list', {templateUrl: 'list', controller: 'listController'});
    }])
    .controller(
        'listController',
        ['$scope', '$timeout', function ($scope, $timeout) {
            $scope.loading = true;

            var callback = function () {
                $scope.loading = false;
                $scope.colors = [
                    {name: 'Almost Blue'},
                    {name: 'Kind Of Blue'},
                    {name: 'Totally Not Blue'}
                ];
            };

            // Using $timeout to sort of fake an XHR just to rule out XHR as a cause
            $timeout(callback, 500);
        }]
    );
}());