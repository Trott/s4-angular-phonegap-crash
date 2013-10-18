(function () {
    'use strict';
    angular.module('main', ['list'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/', {templateUrl: 'main'})
        .otherwise({redirectTo: '/'});
    }]);
}());