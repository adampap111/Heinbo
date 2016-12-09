(function () {
    "use strict";

    anguler.module("app-profile")
    .controller("profileController", profileController);

    function profileController($http) {
        var vm = this;
        vm.user = [];
    }
})();