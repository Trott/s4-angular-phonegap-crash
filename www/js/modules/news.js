!function(){"use strict";angular.module("news",["rssReader"]).config(["$routeProvider",function(a){a.when("/news",{templateUrl:"news/mainMenu.html",controller:"newsController"})}]).controller("newsController",["$scope","rssReaderService",function(a,b){a.load=function(){var c=b.getRssData("http://feeds.feedburner.com/UCSF_News",a,{localStorageKey:"feed_ucsf_news"});c.then(function(b){a.feed=b})};a.load()}])}();