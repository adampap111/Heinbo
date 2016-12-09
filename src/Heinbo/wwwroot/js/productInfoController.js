/// <reference path="lib/angular/angular.js" />
(function () {
    "use strict";
    angular.module("app-productInfo")
        .controller("productInfoController", productInfoController);

    function productInfoController($http, $location, $scope) {
        var vm = this;
        vm.errorMessage = "";
        vm.isBusy = true;
       
        vm.responseData = {};

        var splitPath = $location.absUrl().split("App/ProductInfo/")[1];
        vm.productName = splitPath.split("#/")[0];

        var url = "/api/productInfo/" + vm.productName;
   

        $http.get(url)
          .then(function (response) {
              angular.copy(response.data, vm.responseData);

          }, function (error) {
              vm.errorMessage = "Failed to load stops";
          })
          .finally(function () {
              vm.isBusy = false;
          });

        vm.addItem = function () {
            vm.isBusy = true;
            vm.errorMessage = "";
            $http.post("/cart/AddToCart", vm.responseData)
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