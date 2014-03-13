define(['app'], function (app) {

    app.controller('Tests.QuestionEditCtrl', ['$scope', '$location', '$q', 'testsFactory', 'questionsFactory',
        'answersFactory', '$routeParams', 'ngTableParams', '$sce',
        function ($scope, $location, $q, testsFactory, questionsFactory, answersFactory, $routeParams, ngTableParams, $sce) {

            $scope.test_id = $routeParams.test_id;
            testsFactory.get({id: $routeParams.test_id}, function (res) {
                $scope.test = res;
            }, function (res) {
                $scope.loading = false;
                if (res.status == 400) {
                    $scope.errors = res.data;
                    $scope.notify(res.data.id, 'danger');
                }
                if (res.status == 500) {
                    $scope.notify(res.status, 'danger');
                }
            });

            $scope.data = {};
            $scope.data.test_id = $routeParams.test_id;
            questionsFactory.get({id: $routeParams.id}, function (res) {
                $scope.loading = false;
                $scope.data = res;
                $scope.bodyPrev = res.body
                //console.log($scope.bodyPrev);
            }, function (res) {
                $scope.loading = false;
                if (res.status == 400) {
                    $scope.errors = res.data;
                    $scope.notify(res.data.id, 'danger');
                }
                if (res.status == 500) {
                    $scope.notify(res.status, 'danger');
                }
            });

            $scope.saveQuestion = function (data, reload) {
                question = new questionsFactory(data);
                $scope.loading = true;

                angular.forEach($scope.answers, function (i, n) {
                    if (i.$edit) {
                        $scope.saveAnswer(i);
                    }
                });

                question.$save({id: $routeParams.id}, function (res) {
                    $scope.loading = false;
                    switch (reload) {
                        case 'close':
                            $location.path('/tests/'+$routeParams.test_id+'/questions');
                            break;
                        case 'reload':
                            $scope.notify('Сохраненно', 'success');
                            $('.btn-primary.dropdown-toggle').click();
                            break;
                        case 'new':
                            $location.path('/tests/'+$routeParams.test_id+'/questions/create');
                            break;
                    }

                }, function (res) {
                    $scope.loading = false;
                    if (res.status == 400) {
                        $scope.errors = res.data;
                        $scope.notify(res.data.id, 'danger');
                    }
                    if (res.status == 500) {
                        $scope.notify(res.status, 'danger');
                    }
                });
            }

            $scope.cancel = function () {
                $location.path('tests/' + $routeParams.test_id + '/questions');
            }

            $scope.cancelEdit = function () {
                $scope.data.body = $scope.bodyPrev
            }

            $scope.addAnswer = function () {
                var answer = new answersFactory({
                    question_id: $routeParams.id,
                    test_id: $scope.test_id,
                    body: 'Ответ'
                });
                $scope.loading = true;
                answer.$create(function (res) {
                    res.$edit = true;
                    $scope.answers.unshift(res);
                    $scope.loading = false;
                }, function (res) {
                    $scope.loading = false;
                    if (res.status == 400) {
                        $scope.errors = res.data;
                        $scope.notify(res.data.id, 'danger');
                    }
                    if (res.status == 500) {
                        $scope.notify(res.status, 'danger');
                    }
                });
            }



            $scope.saveAnswer = function (answer) {
                var answerObj = new answersFactory(answer);
                $scope.loading = true;
                answerObj.$save(function (res) {
                    $scope.loading = false;
                    answer.$edit = false;
                }, function (res) {
                    $scope.loading = false;
                    if (res.status == 400) {
                        $scope.errors = res.data;
                        $scope.notify(res.data.id, 'danger');
                    }
                    if (res.status == 500) {
                        $scope.notify(res.status, 'danger');
                    }
                });
            }

            $scope.setIsRight = function (answer) {
                switch ($scope.data.type) {
                    case 'single':
                        angular.forEach($scope.answers, function (i, n) {
                            if (i != answer) {
                                $scope.answers[n].is_right = false;
                            }
                        });
                        break;
                    case 'multi':
                        break;
                    default:
                        new Error('Unknown question type');
                }
                answersFactory.setIsRight({question_id: $routeParams.id, id: answer.id}, function (res) {
                });
            }

            $scope.removeAnswer = function (itm) {
                var obj = new answersFactory(itm);
                $scope.loading = true;
                obj.$delete({id: itm.id}, function (res) {
                    angular.forEach($scope.answers, function (i, n) {
                        if (i == itm) {
                            $scope.answers.splice(n, 1);
                        }
                    });
                    $scope.loading = false;
                });
                return false;
            }

            var prms = {
                page: 1,            // show first page
                count: 10,          // count per page
                sorting: {
                    id: 'desc'
                },
                question_id: $routeParams.id,
                filter: {}
            };
            $scope.tableParams = new ngTableParams(prms, {
                total: 0,           // length of data
                getData: function ($defer, params) {
                    $scope.loading = true;
                    answersFactory.get(params.url(), function (res) {
                        if(res.data.length == 0){
                            $scope.addAnswer();
                        }
                        $scope.loading = false;
                        $defer.resolve($scope.answers = res.data);
                        $scope.tableParams.total(res.pager.total);
                        $scope.tableParams.page(res.pager.current);
                    });
                }

            });

        }]);

});