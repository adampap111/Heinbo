/// <reference path="lib/angular/angular.js" />
(function () {
    "use strict";

    angular.module("app-productList")
        .controller("productListController", productListController);
        

    function productListController($http, $location, $scope, $parse) {
        var vm = this;
        vm.errorMessage = "";
        vm.isBusy = true;
        $scope.responseData = [];
        $scope.rowLimit = [1,2,3,4];
        $scope.order = "brand";
        //TODO
        vm.categoryFilter = [];
        
        vm.brandFilter = [];
        vm.brandFilter.isChecked = [];
        vm.brandFilter.brandName = [];

        //TODO
        vm.sizeFilter = [];

        //vm.disableBrandFilter = true;
        //$scope.brandToFilterBy = [];
        vm.filteredProducts = [];

        var splitPath1 = $location.absUrl().split("App/Product/")[0];
        var splitPath = $location.absUrl().split("App/Product/")[1];
        vm.category = splitPath.split("#/")[0];
        vm.productInfoUrl = splitPath1 + "App/ProductInfo/";
        var url = "/api/product/" + vm.category;

        $http.get(url)
          .then(function (response) {
              angular.copy(response.data, $scope.responseData);
              vm.filteredProducts = $scope.responseData.product;
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

        vm.stateChanged = function (qId) {
            if (vm.brandFilter.isChecked[qId]) {

                //$scope.brandToFilterBy.push($scope.responseData.brand[qId - 1]);

                vm.brandFilter.brandName[qId] = $scope.responseData.brand[qId - 1];
                //vm.disableBrandFilter = false;
                vm.filterProductsByBrand();
            }
            else {
                //$scope.brandToFilterBy.splice($scope.responseData.brand[qId], 1);
                vm.filterProductsByBrand();
            }
            //if ($scope.brandToFilterBy.length == 0) {
            //    vm.disableBrandFilter = true;
            //}
        };

        vm.filterProductsByBrand = function () {
            vm.filteredProducts = [];
            for (var i = 0; i < $scope.responseData.product.length; i++) {
                var ind = 0;
                var found = false;
                while (!found && ind < vm.brandFilter.brandName.length) {
                    if (vm.brandFilter.isChecked[ind]) {
                        if ($scope.responseData.product[i].brand === vm.brandFilter.brandName[ind]) {
                            vm.filteredProducts.push($scope.responseData.product[i]);
                            found = true;
                        }
                        else {
                            ind++;
                        }
                    }
                    else {
                        ind++;
                    }                   
                }
            }
            if (vm.filteredProducts.length == 0) {
                vm.filteredProducts = $scope.responseData.product;
            }
        }

        //vm.filterProducts = function () {
        //    vm.filteredProducts = [];
        //    if ($scope.brandToFilterBy.length > 0) {
        //        for (var i = 0; i < $scope.responseData.product.length; i++) {
        //            var ind = 0;
        //            var found = false;
        //            while (!found && ind < $scope.brandToFilterBy.length) {
        //                if ($scope.responseData.product[i].brand === $scope.brandToFilterBy[ind]) {
        //                    vm.filteredProducts.push($scope.responseData.product[i]);
        //                    found = true;
        //                }
        //                else {
        //                    ind++;
        //                }
        //            }
        //        }
        //    }
        //    else {
        //        vm.filteredProducts = $scope.responseData.product;
        //    }
        //}
    }
})();