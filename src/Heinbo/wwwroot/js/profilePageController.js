/// <reference path="lib/angular/angular.js" />
(function () {
    "use strict";
    angular.module("app-profilePage")
        .controller("profilePageController", profilePageController);

    function profilePageController($http, $location, $scope) {
        var vm = this;
        vm.errorMessage = "";
        vm.isBusy = true;
        vm.numer = 1;
     

       
    }
})();