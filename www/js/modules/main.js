(function () {
    'use strict';
    angular.module('main', ['shuttle'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/', {templateUrl: 'main/mainMenu.html'})
        .otherwise({redirectTo: '/'});
    }]);
}());