/// <reference path="lib/angular/angular.js" />
(function () {
    "use strict";
    angular.module("app-productInfo")
        .controller("productInfoController", productInfoController);

    function productInfoController($http, $location, $scope) {
        var vm = this;
        vm.errorMessage = "";
        vm.isBusy = true;
        $scope.quantity = 1;
        $scope.responseData = {};
        $scope.responseData.quantity = $scope.quantity;
      

        var splitPath = $location.absUrl().split("App/ProductInfo/")[1];
        vm.productName = splitPath.split("#/")[0];

        var url = "/api/productInfo/" + vm.productName;
        
        vm.cartViewModel = {};
       

        $http.get(url)
          .then(function (response) {
              angular.copy(response.data, $scope.responseData);

          }, function (error) {
              vm.errorMessage = "Failed to load stops";
          })
          .finally(function () {
              vm.isBusy = false;
          });

        $scope.addition = function () {
            $scope.quantity = $scope.quantity + 1;
            $scope.responseData.quantity = $scope.quantity;
            $('.shop-badge .badge').text(222);
        };
        $scope.substract = function () {
            if ($scope.quantity > 1) {
                $scope.quantity = $scope.quantity - 1;
                $scope.responseData.quantity = $scope.quantity;
                $('.shop-badge .badge').text($scope.responseData.length);
            }
        };

        $scope.addItem = function () {
            vm.isBusy = true;
            vm.errorMessage = "";
          
            $http.post("/cart/AddToCart", $scope.responseData)
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