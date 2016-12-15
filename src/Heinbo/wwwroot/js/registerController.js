(function () {
    "use strict";
    angular.module("app-register")
    .controller("registerController", registerController);

    function registerController($scope,$http,$location) {
        var vm = this;
        vm.user = [];

        vm.newUser = {};

        vm.errorMessage = "";
        vm.isBusy = true;

        $scope.Index = function () {
            $location.path("/Auth/Login");
        };


        vm.addUser = function () {
            vm.isBusy = true;
            vm.errorMessage = "";
            $http.post("/api/register", vm.newUser)
            .then(function (response) {
                //success
                $location.path("/Auth/Login");
                vm.user.push(response.data);
                vm.newUser = {};
            }, function (error) {
                //failure
                vm.errorMessage = "Failed to save the data" + error;
            }).finally(function () {
                vm.isBusy = false;
            });
        };
    }

})(window, window.angular);