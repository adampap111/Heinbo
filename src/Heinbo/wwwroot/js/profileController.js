/// <reference path="lib/angular/angular.js" />
(function () {
    "use strict";

    anguler.module("app-profile")
    .controller("profileController", profileController);

    function profileController($http, $scope) {
        var vm = this;
        vm.user = {};

        vm.errorMessage = "";
        vm.isBusy = true;
        var url = "/user/profile";

        $http.get(url)
          .then(function (response) {
              angular.copy(response.data, vm.user);

          }, function (error) {
              vm.errorMessage = "Failed to load user";
          })
          .finally(function () {
              vm.isBusy = false;
          });

        
    }
})();