(function () {
    'use strict';
    angular.module('main', ['news'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/', {templateUrl: 'main/mainMenu.html'})
        .otherwise({redirectTo: '/'});
    }]);
}());