/// <reference path="lib/angular/angular.js" />
(function () {
    "use strict";
    angular.module("app-shoppingCart")
    .controller("shoppingCartSubmitController", shoppingCartSubmitController);

    function shoppingCartSubmitController($http, $scope) {
        var vm = this;
        $scope.cartItems = [];
        $scope.total = 110;
        vm.errorMessage = "";
        vm.isBusy = true;
        var url = "/cart/";

       

    }

})();