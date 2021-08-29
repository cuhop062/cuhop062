var app = angular.module('myApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/subjects', {
            templateUrl: "/ass/subject.html",
            controller: "subjectsCtrl"
        })
        .when('/quizz/:id/:name', {
            templateUrl: "quiz-app.html",
            controller: "quizsCtrl"
        })

});

app.controller('quizsCtrl', function ($scope, $http, $routeParams, quizfactory) {
    $http.get('../JS/db/Quizs/' + $routeParams.id + '.js').then(function (res) {
        quizfactory.questions = res.data;
    })
});
app.controller('subjectsCtrl', function ($scope, $http) {
    $scope.list_subject = [];
    $http.get('../JS/db/Subjects.js').then(function (res) {
        $scope.list_subject = res.data;
    })
});


app.directive('quizfpoly', function (quizfactory, $routeParams,$interval) {
    return {
        restrict: 'AE',
        scope: {},
        templateUrl: '../ass/template_quiz.html',
        link: function (scope, element, attrs) {
            scope.start = function () {
                quizfactory.getQuestions().then(function () {
                    scope.subjectName = $routeParams.name;
                    scope.id = 1; //goi phan tu id thu 0
                    scope.quizOver = false; //chua hoan thanh
                    scope.inProgess = true;
                    scope.getQuestion();
                    scope.startCount();
                })

            };
            scope.reset = function () {
                scope.inProgess = false;
                scope.score = 0;

            };
            scope.getQuestion = function () {
                var quiz = quizfactory.getQuestion(scope.id);
                if (quiz) {
                    scope.question = quiz.Text;
                    scope.options = quiz.Answers;
                    scope.answer = quiz.AnswerId;
                    scope.answerMode = true;
                } else { //khi het cau hoi se ket thuc
                    scope.quizOver = true; //hoanf thanh cau hoi
                }


            };
            scope.checkAnswer = function () {
                // alert('answer');
                if (!$('input[ name = answer]:checked').length) return;
                var ans = $('input[ name = answer]:checked').val();
                if (ans == scope.answer) {
                    scope.score++;
                    scope.correctAns = true;
                } else {
                    // alert('Wrong');
                    scope.correctAns = false;
                }
                scope.answerMode = false; // an va hien nut next
            };
            scope.nextQuestion = function () {
                scope.id++;
                scope.getQuestion();
            };
            scope.reset(); //mac dinh chay ham reset
            //start time
            scope.counter = 600;
            var promise;
            scope.startCount = function () {
                $interval.cancel(promise);
                promise = $interval(function () {
                    console.log(scope.counter--)
                    if (scope.counter == 0) {
                        scope.stop();
                    }
                }, 1000);
            }
            scope.stop = function () {
                $interval.cancel(promise);
                scope.quizOver = true;
                scope.counter = 600;
            }
        }
    }
});

app.filter('counter', [function () { //Filter trong AngularJs thường được dùng để lọc hoặc format dữ liệu.
    return function (seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}]);
app.factory('quizfactory', function ($http, $routeParams) {

    return {
        getQuestions: function () {
            return $http.get('../JS/db/Quizs/' + $routeParams.id + '.js').then(function (res) {
                questions = res.data;
                // alert(questions.length);
            });
        },

        getQuestion: function (id) {
            var randomItem = questions[Math.floor(Math.random() * questions.length)];
            var count = questions.length;
            if (count > 11) {
                count = 11;
            }
            if (id < count) {
                return randomItem;
            } else {
                return false;
            }

        }
    }
});