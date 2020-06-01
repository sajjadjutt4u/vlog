(function () {
  angular
    .module("myApp", ["ui.router"])

    .config(RoutesConfig)
    .controller("loginController", function () {})
    .controller("homeController", function ($scope) {
      console.log($scope.username);
    });

  RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/login");

    $stateProvider.state("login", {
      url: "/login",
      templateUrl: "./src/login.html",
    });

    $stateProvider.state("homePage", {
      url: "/homePage?username",
      templateUrl: "./src/home.html",
      controller: function ($scope, $stateParams) {
        $scope.username = $stateParams.username;
      },
    });
  }
})();
