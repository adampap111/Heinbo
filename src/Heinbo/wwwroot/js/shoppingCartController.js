/// <reference path="lib/angular/angular.js" />
(function () {
    "use strict";
    angular.module("app-shoppingCart")
    .controller("shoppingCartController", shoppingCartController);

    function shoppingCartController($http, $scope) {
        var vm = this;
        $scope.cartItems = [];
        $scope.total = 0;
        vm.errorMessage = "";
        vm.isBusy = true;
        var url = "/cart/";

        $http.get(url)
        .then(function (response) {
            //success
            angular.copy(response.data, $scope.cartItems);

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
            $http.post("/cart/RemoveFromCart", $scope.cartItems[id])
            .then(function (response) {
                //success

            }, function (error) {
                //failure
                vm.errorMessage = error;
            }).finally(function () {
                vm.isBusy = false;
            });
        };

        $scope.addition = function (i) {
            $scope.cartItems[i].quantity = $scope.cartItems[i].quantity + 1;
            $scope.total += $scope.cartItems[i].product.price;
        };
        $scope.substract = function (i) {
            if ($scope.cartItems[i].quantity > 1) {
                $scope.cartItems[i].quantity = $scope.cartItems[i].quantity - 1;
                $scope.total -= $scope.cartItems[i].product.price;
            }
        };
        $scope.calculateTotal = function (i) {
            $scope.total += $scope.cartItems[i].quantity * $scope.cartItems[i].product.price;
        };

        $scope.calculateTotalAfterRemove = function (i) {
            $scope.total -= $scope.cartItems[i].product.price * $scope.cartItems[i].quantity;
        };

        vm.sendOrder = function () {
            vm.isBusy = true;
            vm.errorMessage = "";

            $http.post("/cart/MakeOrder", $scope.cartItems)
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