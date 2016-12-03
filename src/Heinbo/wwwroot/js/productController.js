/// <reference path="lib/angular/angular.js" />
(function () {
    "use strict";
    angular.module("app-product")
    .controller("productController", productController);

    function productController($http, $scope) {
        var vm = this;
        vm.products = [];
        vm.errorMessage = "";
        vm.isBusy = true;
        var url = "/api/";

        $http.get(url)
        .then(function (response) {
            //success
            angular.copy(response.data, vm.products);

        }, function (error) {
            //failure
            vm.errorMessage = "Failed to load data" + error;

        })
        .finally(function () {
            vm.isBusy = false;
        });

    }

})();