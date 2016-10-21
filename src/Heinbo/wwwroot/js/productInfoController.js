(function () {
    "use strict";
    angular.module("app-product")
        .controller("productInfoController", productInfoController);

    function productInfoController($routeParams, $http) {
        var vm = this;

        vm.productName = $routeParams.productName;
        vm.stops = [];
        vm.isBusy = true;
        vm.newProduct = {};
        vm.errorMessage = "";

        var url = "/api/product/" + vm.productName;

        $http.get(url)
            .then(function (response) {
                angular.copy(response.data, vm.newProduct);

            }, function (error) {
                vm.errorMessage = "Failed to load stops";
            })
            .finally(function () {
                vm.isBusy = false;
            });
    }

})();