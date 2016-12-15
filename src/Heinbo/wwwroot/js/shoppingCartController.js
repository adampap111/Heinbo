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

        //get all cart items
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

        //remove cartitem by cartItem ID
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

        //update cartItem quantity by ID
        vm.updateQuantity = function (id) {
            vm.isBusy = true;
            vm.errorMessage = "";
            $http.post("/cart/UpdateQuantity", $scope.cartItems[id])
            .then(function (response) {
                //success
            }, function (error) {
                //failure
                vm.errorMessage = error;
            }).finally(function () {
                vm.isBusy = false;
            });
        };

        //Make the order and delete the cartItems
        vm.sendOrder = function () {
            vm.isBusy = true;
            vm.errorMessage = "";

            $http.post("/order/MakeOrder", $scope.cartItems)
            .then(function (response) {
                //success
            }, function (error) {
                //failure
                vm.errorMessage = error;
            }).finally(function () {
                vm.isBusy = false;
            });
        };

        //calculations for the form
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
        //


        $scope.firstHeaderColor = '#313788';

        $scope.firstTabActive = true;
        $scope.secondTabActive = false;
        $scope.thirdTabActive = false;

        $scope.showFirstTab = function () {
            $scope.firstHeaderColor = '#313788';
            $scope.secondHeaderColor = '#4765A0';
            $scope.thirdHeaderColor = '#4765A0';
            $scope.thirdTabActive = false;
            $scope.secondTabActive = false;
            $scope.firstTabActive = true;
        };

        $scope.showSecondTab = function () {
            $scope.firstHeaderColor = '#4765A0';
            $scope.secondHeaderColor = '#313788';
            $scope.thirdHeaderColor = '#4765A0';
            $scope.firstTabActive = false;
            $scope.secondTabActive = true;
            $scope.thirdTabActive = false;
        };

        $scope.showThirdTab = function () {
            $scope.firstHeaderColor = '#4765A0';
            $scope.secondHeaderColor = '#4765A0';
            $scope.thirdHeaderColor = '#313788';
            $scope.firstTabActive = false;
            $scope.secondTabActive = false;
            $scope.thirdTabActive = true;
        };
    }
})();