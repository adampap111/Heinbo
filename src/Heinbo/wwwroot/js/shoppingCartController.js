/// <reference path="lib/angular/angular.js" />
(function () {
    "use strict";
    angular.module("app-shoppingCart")
    .controller("shoppingCartController", shoppingCartController);

    function shoppingCartController($http, $scope) {
        var vm = this;
        vm.cartItems = [];
      
        vm.errorMessage = "";
        vm.isBusy = true;
        var url = "/cart/";

        $http.get(url)
        .then(function (response) {
            //success
            angular.copy(response.data, vm.cartItems);

        }, function (error) {
            //failure
            vm.errorMessage = "Failed to load data" + error;

        })
        .finally(function () {
            vm.isBusy = false;
        });

        vm.removeItem = function (id) {
            vm.isBusy = true;
            vm.errorMessage = "";
            $http.post("/cart/RemoveFromCart", vm.cartItems[id])
            .then(function (response) {
                //success

            }, function (error) {
                //failure
                vm.errorMessage = error;
            }).finally(function () {
                vm.isBusy = false;
            });
        };

    }

})();