!function(){"use strict";angular.module("main",["angularytics","shuttle","directory","news","maps","library","fitness","events","social","emergency","about","feedback","research"]).config(["$compileProvider",function(a){a.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/)}]).config(["AngularyticsProvider",function(a){a.setEventHandlers(["Google"])}]).run(["Angularytics",function(a){a.init()}]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"main/mainMenu.html"}).otherwise({redirectTo:"/"})}]).controller("navigationController",["$scope","$location",function(a,b){var c=function(){return"/"===b.path()};a.$watch(c,function(){a.hideNavigation=c()})}])}();