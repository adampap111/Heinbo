﻿(function () {
    "use strict";
    angular.module("app-shoppingCart", ["ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            controller: "shoppingCartController",
            controllerAs: "vm",
            templateUrl: "/views/shoppingCart.html"
        });

        $routeProvider
              .when("/submit/", {
                  controller: "shoppingCartSubmitController",
                  controllerAs: "vm",
                  templateUrl: "/views/shoppingCartSubmitController.html"
              });

        $routeProvider.otherwise({ redirectTo: "/" });

    });

})();