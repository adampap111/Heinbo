(function () {
    "use strict";
    angular.module("app-profile", ["ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            controller: "profileController",
            controllerAs: "vm",
            templateUrl: "/views/profile.html"
        });

        $routeProvider.otherwise({ redirectTo: "/" });

    });

})();