(function () {
    "use strict";
    angular.module("app-register", ["ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            controller: "registerController",
            controllerAs: "vm",
            templateUrl: "/views/register.html"
        });
        $routeProvider.when("/login", {
            controller: "registerController",
            controllerAs: "vm",
            templateUrl: "/views/login.html"
        });
      
        $routeProvider.otherwise({ redirectTo: "/" });
     
    });

})();