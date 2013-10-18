(function () {
    'use strict';
    angular.module('main', ['list'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/', {templateUrl: 'main', controller: 'mainController'})
        .otherwise({redirectTo: '/'});
    }]).
    controller('mainController', ['$scope', '$location', function ($scope, $location) {
        $scope.showList = function () {
            $location.path('/list');
        };
    }]);
}());