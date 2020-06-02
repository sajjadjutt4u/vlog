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

      var promise = apicall.getHomeVideos();
      promise
        .then(function (reponse) {
          $scope.videos = reponse.data;
          console.log("api callback:", reponse);
        })
        .catch(function (error) {
          console.log("error in fetching videos");
        });
    })
    .factory("apicall", function ($http) {
      var service = this;
      service.base_url = "https://www.simx.tv/";

      service.getHomeVideos = function () {
        return $http({
          method: "GET",
          url: service.base_url + "getVideosForHomePage.php",
          header: { "Access-Control-Allow-Origin": "*" },
        });
      };
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
