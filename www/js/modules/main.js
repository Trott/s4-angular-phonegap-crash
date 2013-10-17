(function () {
    'use strict';
    angular.module('main', ['news'])
    .config(['$compileProvider', function ($compileProvider) {
        $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    }])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/', {templateUrl: 'main/mainMenu.html'})
        .otherwise({redirectTo: '/'});
    }])
    .controller('navigationController', ['$scope', '$location', function ($scope, $location) {
        var getHideNavigation = function () {
            return $location.path() === '/';
        };

        $scope.$watch(getHideNavigation, function() { $scope.hideNavigation = getHideNavigation(); });
    }]);
}());