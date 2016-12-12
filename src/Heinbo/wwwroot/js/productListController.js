/// <reference path="lib/angular/angular.js" />
(function () {
    "use strict";
    angular.module("app-productList")
        .controller("productListController", productListController);

    function productListController($http, $location, $scope) {
        var vm = this;
        vm.errorMessage = "";
        vm.isBusy = true;
        $scope.responseData = [];
        $scope.rowLimit = [1,2,3,4];
        $scope.order = "brand";
        $scope.categoryFilter = [];
        $scope.brandFilter = [];
        $scope.sizeFilter = [];

        var splitPath1 = $location.absUrl().split("App/Product/")[0];
        var splitPath = $location.absUrl().split("App/Product/")[1];
        vm.category = splitPath.split("#/")[0];
        vm.productInfoUrl = splitPath1 + "App/ProductInfo/";
        var url = "/api/product/" + vm.category;

        $http.get(url)
          .then(function (response) {
              angular.copy(response.data, $scope.responseData);

          }, function (error) {
              vm.errorMessage = "Failed to load data";
          })
          .finally(function () {
              vm.isBusy = false;
          });

        vm.addToCart = function (id) {
            vm.isBusy = true;
            vm.errorMessage = "";
            vm.quantity(id);
            $http.post("/cart/AddToCart", $scope.responseData.product[id])
            .then(function (response) {
                //success

            }, function (error) {
                //failure
                vm.errorMessage = error;
            }).finally(function () {
                vm.isBusy = false;
            });
        };

        vm.quantity = function (i) {
            
            $scope.responseData.product[i].quantity = 1;
        };



    }
})();