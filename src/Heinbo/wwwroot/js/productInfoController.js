/// <reference path="lib/angular/angular.js" />
(function () {
    "use strict";
    angular.module("app-productInfo")
        .controller("productInfoController", productInfoController);

    function productInfoController($http, $location, $scope) {
        var vm = this;
        vm.errorMessage = "";
        vm.isBusy = true;
        $scope.responseData = [];


        var splitPath = $location.absUrl().split("App/ProductInfo/")[1];

        vm.productName = splitPath.split("#/")[0];
        var url = "/api/productInfo/" + vm.productName;
        var url2 = "/api/product/";

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