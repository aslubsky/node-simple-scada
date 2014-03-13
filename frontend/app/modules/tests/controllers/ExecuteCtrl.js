define(['app'], function (app) {

    app.controller('Tests.ExecuteCtrl', ['$scope', '$rootScope', '$location', '$q', 'resultsFactory', 'tasksFactory', 'questionsFactory', '$routeParams', '$timeout', '$filter',
        function ($scope, $rootScope, $location, $q, resultsFactory, tasksFactory, questionsFactory, $routeParams, $timeout, $filter) {
            //states
            if ($routeParams.mode) {
                $scope.mode = $routeParams.mode;
                $location.$$search.mode = $routeParams.mode;
            }




            /*if($routeParams.course && $routeParams.courseTaskId){
                $scope.materials = false;
                $scope.courseTaskId = $routeParams.courseTaskId
                if($routeParams.materials){
                    $scope.materials = true;
                }
                tasksFactory.get({id: $routeParams.courseTaskId}, function (res) {
                    $scope.courseTask = res;
                });
            }*/




            $scope.intervalToUpdate = 5000;
            $scope.setDefaultStates = function () {
                $scope.canStartNewSession = false;
                $scope.canUsePrevSession = false;
                $scope.canFinish = false;
                $scope.finished = false;
            };
            $scope.setDefaultStates();
            $scope.prevSession = {};


            if ($routeParams.taskId && $routeParams.taskId != 0 || $routeParams.courseTaskId) {
                tasksFactory.get({id: $routeParams.courseTaskId ? $routeParams.courseTaskId : $routeParams.taskId, mode: $scope.mode}, function (res) {
                    $scope.loading = false;
                    $scope.task = res;
                }, function (res) {
                    $scope.loading = false;
                    if (res.status == 400) {
                        $scope.errors = res.data;
                    }
                    if (res.status == 500) {
                        $scope.notify(res.status, 'danger');
                    }
                });
            }

            //$routeParams.taskId - this is task id, not test
            // /tests/:taskId/results
            resultsFactory.getTest({taskId: $routeParams.taskId, mode: $scope.mode, testId: $routeParams.testId}, function (res) {
                $scope.loading = false;
                $scope.test = res.test;
                $scope.settings = res.settings;
                $scope.questionsCount = res.questionsCount;

                $scope.setDefaultStates();
                if (!$scope.mode) {
                    $scope.prevSession = res.testSession;
                }
                if ($scope.prevSession && $scope.prevSession.id && $scope.prevSession.status) {
                    $scope.canUsePrevSession = !$scope.prevSession.canFinish;
                    $scope.canFinish = $scope.prevSession.canFinish;

                    var end = moment(parseInt($scope.prevSession.created_at, 10));
                    var start = moment(parseInt($scope.prevSession.updated_at, 10));
                    $scope.prevSession.time = start.diff(end);
                    if ($scope.settings.time !== 0) {
                        $scope.prevSession.haveTime = $scope.settings.time * 60 * 1000 - start.diff(end);
                    }
                } else {
                    $scope.canStartNewSession = true;
                }
            }, function (res) {
                $scope.loading = false;
                if (res.status == 400) {
                    $scope.errors = res.data;
                }
                if (res.status == 500) {
                    $scope.notify(res.status, 'danger');
                }
            });

            $scope.newExecute = function () {
                if ($scope.checkedAnswers) {
                    $scope.checkedAnswers = null;
                    $scope.checkedError = null;
                }
                resultsFactory.create({taskId: $routeParams.taskId, mode: $scope.mode, testId: $routeParams.testId}, function (res) {

                    resultsFactory.getQuestion({taskId: $routeParams.taskId, mode: $scope.mode, testId: $routeParams.testId}, function (res) {
                        $scope.question = res;
                        $scope.loading = false;
                        if (!$scope.mode) {
                            if ($scope.settings.time !== 0) {
                                $scope.Timer();
                            }
                            $rootScope.testsTimer = $timeout($scope.out, $scope.intervalToUpdate);
                        }
                        $scope.setDefaultStates()
                    });
                });
            }
            $scope.startExecute = function () {
                if ($scope.checkedAnswers) {
                    $scope.checkedAnswers = null;
                    $scope.checkedError = null;
                }
                $scope.loading = true;
                resultsFactory.getQuestion({taskId: $routeParams.taskId, testId: $routeParams.testId}, function (res) {
                    if (!res.id) {// no questions any more
                        $scope.canFinish = true;
                    }
                    if ($scope.settings.time !== 0) {
                        $scope.Timer($scope.prevSession.created_at, $scope.prevSession.updated_at);
                    }

                    $rootScope.testsTimer = $timeout($scope.out, $scope.intervalToUpdate);

                    $scope.question = res;
                    $scope.loading = false;

                    $scope.setDefaultStates();
                });
            }
            $scope.saveAnswer = function (question) {
                $scope.error = false;

                if (question.type == 'single') {
                    if (!question.checked) {
                        $scope.error = true;
                        return;
                    }
                    $scope.loading = true;
                    resultsFactory.save({
                        taskId: $routeParams.taskId,
                        question_id: question.id,
                        answer_id: question.checked,
                        mode: $scope.mode,
                        testId: $routeParams.testId
                    }, function (res) {
                        $scope.checkedError = null;
                        $scope.question = res;
                        if (!res.id) {// no questions any more
                            $scope.finish();
                            $scope.canFinish = true;
                        }
                        $scope.loading = false;
                    });

                } else if (question.type == 'multi') {
                    var ids = [];
                    angular.forEach(question.answers, function (answer) {
                        if (answer.checked != undefined && answer.checked) {
                            ids.push(answer.id);
                        }
                    });

                    if (ids < 1) {
                        $scope.error = true;
                        return;
                    }
                    $scope.loading = true;
                    resultsFactory.save({
                        taskId: $routeParams.taskId,
                        question_id: question.id,
                        answer_ids: ids,
                        mode: $scope.mode,
                        testId: $routeParams.testId
                    }, function (res) {
                        $scope.checkedError = null;
                        $scope.question = res;
                        if (!res.id) {// no questions any more
                            $scope.finish();
                            $scope.canFinish = true;
                        }
                        $scope.loading = false;
                    });

                }
            }
            $scope.finish = function () {
                $scope.loading = true;
                $scope.showTimer = false;
                $scope.question = false;

                var finish;
                if ($routeParams.mode && $routeParams.mode === 'testing') {
                    finish = new resultsFactory({mode: $routeParams.mode, testId: $routeParams.testId});
                } else {
                    finish = new resultsFactory();
                }
                finish.$finish({
                    taskId: $routeParams.taskId
                }, function (res) {

                    var end = moment(res.start);
                    var start = moment(res.end);
                    var result = start.diff(end);
                    $scope.testFinishRes = res;
                    $scope.testFinishRes.time = result
                    $scope.loading = false;

                    $scope.setDefaultStates();
                    $scope.finished = true;
                    $scope.nextTask = res.nextTask;

                });
            }

            $scope.complete = function () {
                if ($scope.mode) {
                    if ($scope.task.parent_id) {
                        if ($routeParams.materials) {
                            $location.$$search = {};
//                            $location.$$search.mode = $routeParams.mode;
                            $location.path('/courses/materials/' + ($routeParams.courseTaskId ? $routeParams.courseTaskId : $routeParams.taskId));
                        } else {
                            $location.path('/courses/execute/' + $scope.task.parent_id);
                        }
                    } else {
                        $location.path('/tasks/');
                    }
                } else {
                    if ($scope.nextTask && $scope.nextTask.id) {
                        if ($scope.nextTask.type == 'resource') {
                            $location.path('/pages/execute/' + $scope.nextTask.id);
                        }
                        if ($scope.nextTask.type == 'test') {
                            $location.path('/tests/execute/' + $scope.nextTask.id);
                        }
                    } else {
                        $location.path('/courses/finish/' + $scope.task.parent_id);
                    }
                }
            }


            $scope.Timer = function (startDate, stopDate) {
                $scope.showTimer = true;

                if (startDate && stopDate) {

                    var stop = moment(new Date(startDate * 1));
                    var start = moment(new Date(stopDate * 1));
                    var result = start.diff(stop);
                    $scope.timer = ($scope.settings.time * 60) - (result / 1000);
                } else {
                    $scope.timer = $scope.settings.time * 60;
                }

                if ($scope.timer > 0) {
                    $scope.onTimeout = function () {
                        $scope.timer--;
                        mytimeout = $timeout($scope.onTimeout, 1000);
                        if ($scope.canFinish == true) {
                            $timeout.cancel(mytimeout);
                            $scope.showTimer = false;
                        }
                        if ($scope.timer < 1) {
                            $timeout.cancel(mytimeout);
                            $scope.finish();
                            $scope.question = false;
                            $scope.canFinish = true;
                            $scope.finished = true;
                            $scope.timer = false;
                            $scope.timeout = true;
                        }
                    }
                    var mytimeout = $timeout($scope.onTimeout, 1000);

                }

            }

            $scope.out = function () {
                if ($scope.settings.time !== 0 && $scope.showTimer == true) {
                    if ($rootScope.testsTimer && $scope.canFinish == false) {
                        if ($scope.settings.time !== 0) {
                            $rootScope.testsTimer = $timeout($scope.out, $scope.intervalToUpdate);
                            resultsFactory.updateTime({taskId: $routeParams.taskId}, function (res) {
                            });
                        }
                    }
                }
            }

            $scope.secondToTime = function (sec) {
                var hours = (Math.floor(time / (60 * 60)) < 10 ? '0' + Math.floor(time / (60 * 60)) : Math.floor(time / (60 * 60)));
                var divisor_for_minutes = time % (60 * 60);
                var minutes = (Math.floor(divisor_for_minutes / 60) < 10 ? '0' + Math.floor(divisor_for_minutes / 60) : Math.floor(divisor_for_minutes / 60));

                var divisor_for_seconds = divisor_for_minutes % 60;
                var seconds = (Math.ceil(divisor_for_seconds) < 10 ? '0' + Math.ceil(divisor_for_seconds) : Math.ceil(divisor_for_seconds));
            }

            $scope.cancel = function () {

                if ($scope.mode) {
                    if ($scope.task.parent_id) {
                        if ($routeParams.materials) {
                            $location.$$search = {};
                            $location.path('/courses/materials/' + ($routeParams.courseTaskId ? $routeParams.courseTaskId : $routeParams.taskId));
                        } else {
                            $location.path('/courses/execute/' + $scope.task.parent_id);
                        }
                    } else {
                        $location.path('/tasks/');
                    }
                } else {
                    $location.path('/courses/execute/' + $scope.task.parent_id);
                }


            }


            $scope.checkAnswer = function (data) {
                var question;

                if (data.type == 'single') {
                    if (!data.checked) {
                        $scope.checkedError = true;
                    }

                    if (data.checked) {
                        question = new questionsFactory({answers: { checked: {id: data.checked, checked: true}}});
                    }
                } else {
                    angular.forEach(data.answers, function (i, k) {
                        if (!i.checked) {
                            $scope.checkedError = true;
                        }
                    });

                    question = new questionsFactory(data);
                }

                if (question) {
                    $scope.checkedAnswers = [];
                    $scope.loading = true;
                    question.$checkAnswer({id: data.id}, function (res) {

                        $scope.loading = false;
                        if (res.data.length > 0) {
                            $scope.checkedError = false;
                        }
                        $scope.checkedAnswers = res.data
                    }, function (res) {
                        $scope.loading = false;
                        if (res.status == 400) {
                            $scope.errors = res.data;
                        }
                    });

                } else {
                    $scope.checkedError = true;
                }

            }


        }]);

});