define(['app'], function (app) {

    app.controller('Tasks.EditCtrl', ['$scope', '$location', '$q', 'tasksFactory', '$routeParams', 'tasksSettingsFactory',
        function ($scope, $location, $q, tasksFactory, $routeParams, tasksSettingsFactory) {

            $scope.data = {
                task: {
                    threshold: 0
                },
                settings: {
                    attempts_type: 'unlim',
                    questions_type: 'all',
                    time_type: 'unlimited',
                    attempts_count: 10,
                    questions_count: 1,
                    time: 1
                }
            };

            if($routeParams.id) {
                tasksFactory.get({id: $routeParams.id, is_edit: true}, function (res) {
                    $scope.loading = false;
                    $scope.data.task = res;

                    if ($scope.data.task.type == 'test') {
                        tasksSettingsFactory.get({id: $routeParams.id}, function (res) {
                            $scope.data.settings = res;
                            $scope.data.settings.attempts_type = $scope.data.settings.unlim_attempts ? 'unlim' : 'limited';
                            $scope.data.settings.questions_type = $scope.data.settings.all_questions ? 'all' : 'limited';
                            if ($scope.data.settings.time == 0) {
                                $scope.data.settings.time_type = 'unlimited';
                            } else {
                                $scope.data.settings.time_type = 'limited';
                            }
                        });
                    }
                });
            }

            tasksSettingsFactory.getTests({}, function (res) {
                $scope.tests = res.data;
                $scope.$watch('data.task.element_id', function () {
                    //console.log('O_o');
                    $scope.questionsCount = 0;
                    angular.forEach($scope.tests, function (itm) {
                        if (itm.id == $scope.data.task.element_id) {
                            $scope.questionsCount = itm.questions_count;
                            if ($scope.data.settings.questions_count > $scope.questionsCount) {
                                $scope.data.settings.questions_count = $scope.questionsCount;
                            }
                        }
                    });
                });
            });
            tasksSettingsFactory.getResources({}, function (res) {
                $scope.resources = res.data;
            });
            tasksSettingsFactory.getCourses({}, function (res) {
                $scope.courses = res.data;
            });

            $scope.save = function (data) {
                task = new tasksFactory(data.task);
                $scope.loading = true;
                task.$save({id: $routeParams.id}, function (res) {
                    if ($scope.data.task.type == 'test') {
                        data.settings.unlim_attempts = data.settings.attempts_type == 'unlim' ? 1 : 0;
                        data.settings.all_questions = data.settings.questions_type == 'all' ? 1 : 0;
                        taskParams = new tasksSettingsFactory(data.settings);
                        $scope.loading = true;
                        taskParams.$save({id: res.id}, function (res) {
                            $scope.loading = false;
                            $location.path('/tasks');
                        }, function (res) {
                            $scope.loading = false;
                            if (res.status == 400) {
                                $scope.errors = res.data;
                            }
                        });
                    } else {
                        $scope.loading = false;
                        $location.path('/tasks');
                    }
                }, function (res) {
                    $scope.loading = false;
                    if (res.status == 400) {
                        $scope.errors = res.data;
                    }
                });
            }


            $scope.cancel = function () {
                $location.path('/tasks');
            }

        }]);

});