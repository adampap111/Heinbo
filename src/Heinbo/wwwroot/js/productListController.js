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
        //$scope.rowLimit = [1,2,3,4];
        $scope.order = "brand";
        
        vm.categoryFilter = [];
        vm.categoryFilter.isChecked = [];
        vm.categoryFilter.categoryName = [];
        
        vm.brandFilter = [];
        vm.brandFilter.isChecked = [];
        vm.brandFilter.brandName = [];

        vm.sizeFilter = [];
        vm.sizeFilter.isChecked = [];
        vm.sizeFilter.size = [];

        $scope.pageNumber = 1;
        $scope.minProductNr = 0;
        $scope.maxProductNr = 9;

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
              $scope.pageNumber = Math.ceil(vm.filteredProducts.length / 9) - 1;
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

        $scope.getNumber = function (num) {
            return new Array(num);
        };

        //page steps
        $scope.nextPage = function () {
            if ($scope.pageNumber >= 1 && $scope.responseData.product.length > $scope.maxProductNr) {
                $scope.minProductNr = $scope.minProductNr + 9;
                $scope.maxProductNr = $scope.maxProductNr + 9;
            }
        };

        $scope.previousPage = function () {
            if ($scope.pageNumber >= 1 && $scope.minProductNr > 8) {
                $scope.minProductNr = $scope.minProductNr - 9;
                $scope.maxProductNr = $scope.maxProductNr - 9;
            }
        };

        //product limit on page
        $scope.setNine = function () {
            $scope.maxProductNr = $scope.minProductNr + 9;
            $scope.limit = 9;
        };

        $scope.setEightteen = function () {
            $scope.maxProductNr = $scope.minProductNr + 18;
            $scope.limit = 18;
        };

        $scope.setTwentyseven = function () {
            $scope.maxProductNr = $scope.minProductNr + 27;
            $scope.limit = 27;
        };

        // filters
        vm.stateChanged = function (qId) {
            if (vm.brandFilter.isChecked[qId]) {
                vm.brandFilter.brandName[qId] = $scope.responseData.brand[qId - 1];

                vm.filterProducts(vm.brandFilter.isChecked, vm.brandFilter.brandName);  
            }
            else {
                vm.filterProducts(vm.brandFilter.isChecked, vm.brandFilter.brandName);
            }
        };

        vm.categoryStateChanged = function (qId) {
            if (vm.categoryFilter.isChecked[qId]) {
                vm.categoryFilter.categoryName[qId] = $scope.responseData.category[qId - 1];

                vm.filterProducts(vm.categoryFilter.isChecked, vm.categoryFilter.categoryName);
            }
            else {
                vm.filterProducts(vm.categoryFilter.isChecked, vm.categoryFilter.categoryName);
            }
        };

        vm.sizeStateChanged = function (qId) {
            if (vm.sizeFilter.isChecked[qId]) {
                vm.sizeFilter.size[qId] = $scope.responseData.size[qId - 1];

                vm.filterProducts(vm.sizeFilter.isChecked, vm.sizeFilter.size);
            }
            else {
                vm.filterProducts(vm.sizeFilter.isChecked, vm.sizeFilter.size);
            }
        };

        vm.filterProducts = function (isCheckedArray, attrArray) {
            $scope.minProductNr = 0;
            $scope.maxProductNr = 9;
            vm.filteredProducts = [];
            vm.filteredProducts = vm.filterProductsGeneric($scope.responseData.product, isCheckedArray, attrArray);
            if (vm.filteredProducts.length == 0) {
                vm.filteredProducts = $scope.responseData.product;
            }
            $scope.pageNumber = Math.ceil(vm.filteredProducts.length / 9);
        };

        vm.filterProductsByBrand = function (array) {
            var tempArray = [];
            if (array instanceof Array && array.length > 0) {
                for (var i = 0; i < array.length; i++) {
                    var ind = 0;
                    var found = false;
                    while (!found && ind < vm.brandFilter.brandName.length) {
                        if (vm.brandFilter.isChecked[ind]) {
                            if (array[i].brand === vm.brandFilter.brandName[ind]) {
                                tempArray.push(array[i]);
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
            }
            return tempArray;
        };

        vm.filterProductsByCategory = function (array) {
            var tempArray = [];
            if (array instanceof Array && array.length > 0) {
                for (var i = 0; i < array.length; i++) {
                    var ind = 0;
                    var found = false;
                    while (!found && ind < vm.categoryFilter.categoryName.length) {
                        if (vm.categoryFilter.isChecked[ind]) {
                            if (array[i].subCategory === vm.categoryFilter.categoryName[ind]) {
                                tempArray.push(array[i]);
                                found = true;
                            }
                            else {
                                ind++;

                                vm.errorMessage = vm.errorMessage + " " + array[i].subCategory;

                            }
                        }
                        else {
                            ind++;
                        }
                    }
                }
            }
            return tempArray;
        };

        vm.filterProductsGeneric = function (array, isCheckedArray, attrArray) {
            var tempArray = [];
            if (array instanceof Array && array.length > 0) {
                for (var i = 0; i < array.length; i++) {
                    var ind = 0;
                    var found = false;
                    while (!found && ind < attrArray.length) {
                        if (isCheckedArray[ind]) {
                            if (array[i].brand === attrArray[ind] || array[i].subCategory === attrArray[ind] || array[i].size === attrArray[ind]) {
                                tempArray.push(array[i]);
                                found = true;
                            }
                            else {
                                ind++;
                            }
                        }
                        else {
                            ind++;
                            vm.errorMessage = vm.errorMessage + " " + tempArray.length;
                        }
                    }
                }
            }
            return tempArray;
        };
    }
})();