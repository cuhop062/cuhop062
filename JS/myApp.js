var app = angular.module('myApp', ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider
        .when("/index", { templateUrl: "../ass/index.html" })
        .when("/about", { 
            templateUrl: "/ass/gioithieu.html" 
        })
        .when('/subjects', {
            templateUrl: "/ass/subject.html",
            controller: "subjectsCtrl"
        })
        .when("/contact", { templateUrl: "../ass/contact.html" })
        .when("/feedback", { templateUrl: "../ass/gopy.html" })
        .when("/FAQ", { templateUrl: "../ass/hoidap.html" })
        .when("/login", { templateUrl: "../ass/login.html", controller: "" })
        .when("/register", { templateUrl: "../ass/dangky2.html", controller: "" })
        .when("/forgotpassword", { templateUrl: "html/forgotpassword.html", controller: "forgotpasswordCtrl" })
        .when("/updateaccount", { templateUrl: "html/updateaccount.html", controller: "updateaccountCtrl" })
        .when("/changepassword", { templateUrl: "html/changepassword.html", controller: "changepasswordCtrl" })
        .when("/viewtest/:id", { templateUrl: "html/viewtest.html", controller: "viewtestCtrl" })



});