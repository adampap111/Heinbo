(function () {
    "use strict";
    angular.module("app-product")
    .controller("productController", productController);

    function productController($http, $scope) {
        var vm = this;
        vm.products = [];
        vm.newProduct = {};

        vm.errorMessage = "";
        vm.isBusy = true;
        $scope.quantity = 3;

        $http.get("/api/product")
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

        vm.addProduct = function () {
            vm.isBusy = true;
            vm.errorMessage = "";
            $http.post("/api/product", vm.newProduct)
            .then(function (response) {
                //success
                vm.products.push(response.data);
                vm.newProduct = {};
            }, function () {
                //failure
                vm.errorMessage = "Failed to save the data";
            }).finally(function () {
                vm.isBusy = false;
            });
        };
    }

})(window, window.angular);