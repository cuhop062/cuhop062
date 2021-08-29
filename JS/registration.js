var app = angular.module("myApp", ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider.when("/register", {
        templateUrl: "/ass/dangky2.html",
        controller: "registrationCtrl"
    })
        .when("/login", {
            templateUrl: "/ass/login.html",
            controller: "loginCtrl"
        })
        .when("/hoidap", {
            templateUrl: "/ass/hoidap.html"
        })
        .when("/logout", {
            templateUrl: "/ass/logout.html"
        })
        .when("/quenmk", {
            templateUrl: "/ass/quenMK.html"
        })
        .when("/doimk", {
            templateUrl: "/ass/doiMK.html"
        })
});
app.controller("loginCtrl", function ($scope, $location) {
    $scope.checkLogin = function (even) {
        var data = {
            username: $scope.username,
            password: $scope.password
        }
            if ($scope.username  == "AHop" && $scope.password == "0602") {
               window.location.href = "../ass/index.html";
                alert("Login")
            }else{
                alert("Dang nhap that bai");
            }



    }
})
app.controller("registrationCtrl", function ($scope, $http) {
    $scope.postdata = function (even) {
        var data = {
            username: $scope.username,
            password: $scope.password,
            fullname: $scope.fullname,
            email: $scope.email,
            gender: $scope.gender,
            birthday: $scope.birthday,
            phone: $scope.phone
        }
        $http.post("http://localhost:3000/listStudent", data).then(function (res) {
            if (data != null) {
                window.location.href = "/ass/index.html";
                alert("Register Ok");
            }


        }), function (error) {
            alert("Sign Up False");
        }
    }
});