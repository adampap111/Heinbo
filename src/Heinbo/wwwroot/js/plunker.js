angular.module('plunker', []);
function AccordionDemoCtrl($scope) {
    $scope.oneAtATime = true;

    $scope.items = [
      {
          name: "Dynamic Group Header - 1",
          info: "Dynamic Group Body - 1"
      },
      {
          name: "Dynamic Group Header - 2",
          info: "Dynamic Group Body - 2"
      }
    ];


}