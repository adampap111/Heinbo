/// <reference path="lib/angular/angular.js" />
(function () {
    "use strict";
    angular.module("app-profilePage")
        .controller("profilePageController", profilePageController);

    function profilePageController($http, $location, $scope) {
        var vm = this;
        vm.errorMessage = "";
        vm.isBusy = true;
        vm.user = [];

        vm.responseData = {};
     
        var url = "/user/profile";
       
        $http.get(url)
          .then(function (response) {
              angular.copy(response.data, vm.responseData);
              
          }, function (error) {
              vm.errorMessage = "Failed to load user";
          })
          .finally(function () {
              vm.isBusy = false;
          });

        vm.updateUser = function () {
            vm.isBusy = true;
            vm.errorMessage = "";

            $http.post(url, vm.responseData)
            .then(function (response) {
                //Success
                vm.user.push(response.data);

            }, function (error) {
                //Failure
                vm.errorMessage = "Failed to update the user" + error;
            }).finally(function () {
                vm.isBusy = false;
            });
        };
    }
})();