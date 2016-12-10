(function () {
    "use strict";
    angular.module("app-contactPage")
        .controller("contactPageController", contactPageController);

    function contactPageController($http, $scope, $window) {
        var vm = this;
        vm.errorMessage = "";
        vm.isBusy = true;
        
    }
})();