!function(){"use strict";angular.module("research",[]).config(["$routeProvider",function(a){a.when("/research/:profileId",{templateUrl:"research/profile.html",controller:"researchProfileController"})}]).controller("researchProfileController",["$scope","$routeParams","$http",function(a,b,c){a.loading=!0;a.loadError=!1;var d=b.profileId.replace(/\D/g,"");a.load=function(){c({method:"GET",url:"http://api.profiles.ucsf.edu/json/v2/?publications=full&mobile=on&source=m.ucsf.edu&ProfilesNodeID="+d}).success(function(b){a.loading=!1;a.loadError=!1;a.profiles=b.Profiles}).error(function(){a.loading=!1;a.loadError=!0})};a.load()}])}();