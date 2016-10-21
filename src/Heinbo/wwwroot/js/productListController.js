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
        $scope.limit = 9;
        $scope.order = "brand";
        $scope.categoryFilter = [];
        $scope.brandFilter = [];
        $scope.sizeFilter = [];
               
      
        var splitPath = $location.absUrl().split("App/Product/")[1];
        vm.category = splitPath.split("#/")[0];
        var url = "/api/product/" + vm.category;

        $http.get(url)
          .then(function (response) {
              angular.copy(response.data, $scope.responseData);

          }, function (error) {
              vm.errorMessage = "Failed to load stops";
          })
          .finally(function () {
              vm.isBusy = false;
          });
                            
       }

})();