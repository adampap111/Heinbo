(function () {
    "use strict";
    angular.module("app-product", ["ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            controller: "productController",
            controllerAs: "vm",
            templateUrl: "/views/mainProductInfo.html"
        });
        $routeProvider.when("/product/:productName", {
          controller: "productInfoController",
          controllerAs: "vm",
          templateUrl: "/views/shop-ui-inner.html"
        });
      
       
             
        $routeProvider.otherwise({ redirectTo: "/views/shop-ui-inner.html" });

    });

})();