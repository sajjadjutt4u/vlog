(function () {
  angular
    .module("myApp", ["ui.router"])

    .config(RoutesConfig)
    .controller("loginController", function () {})
    .controller("notRegisteredController", function () {})
    .controller("homeController", function ($scope, $window, apicall) {
      if (sessionStorage.getItem("username") != null) {
        console.log("Session Data:", sessionStorage.getItem("username"));
      } else {
        $window.location.href = "#!/login";
      }
    })
    .factory("apicall", function ($http) {
      var service = this;
      // service.getHomeVideos = function (username) {
      //   $http.get();
      // };
      return service;
    });

  RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $stateProvider.state("login", {
      url: "/login",
      templateUrl: "./src/login.html",
    });

    $stateProvider.state("notRegistered", {
      url: "/notRegistered",
      templateUrl: "./src/notRegistered.html",
    });

    $stateProvider.state("home", {
      url: "/home?username",
      templateUrl: "./src/home.html",
      controller: function ($scope, $stateParams) {
        $scope.username = $stateParams.username;
        sessionStorage.setItem("username", $stateParams.username);
      },
    });

    $urlRouterProvider.otherwise("/login");
  }
})();
