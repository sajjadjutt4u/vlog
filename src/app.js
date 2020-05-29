(function () {
  angular
    .module("myApp", ["ui.router"])

    .config(RoutesConfig)
    .controller("loginController", function () {});

  RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/login");

    $stateProvider.state("login", {
      url: "/login",
      templateUrl: "./src/login.html",
    });
  }
})();
