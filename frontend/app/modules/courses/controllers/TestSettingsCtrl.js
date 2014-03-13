define(['app'], function (app) {

    app.controller('Course.TestSettingsCtrl', ['$scope', '$location', '$q', 'coursesFactory', '$routeParams', 'testSettingsFactory',
        function ($scope, $location, $q, coursesFactory, $routeParams, testSettingsFactory) {
            coursesFactory.get({id: $routeParams.id}, function (res) {
                $scope.loading = false;
                $scope.course = res;
            });

            $scope.testSetting = {
                threshold: 0,
                attempts_type: 'unlim',
                questions_type: 'all',
                time_type: 'unlimited',
                attempts_count: 10
            };
            testSettingsFactory.get({courseId: $routeParams.id, testId: $routeParams.testId}, function (res) {
                $scope.loading = false;
                $scope.test = res.test;
                $scope.testSetting = res.setting;
                $scope.testSetting.attempts_type = $scope.testSetting.unlim_attempts ? 'unlim' : 'limited';
                $scope.testSetting.questions_type = $scope.testSetting.all_questions ? 'all' : 'limited';
                if ($scope.testSetting.time == 0) {
                    $scope.testSetting.time_type = 'unlimited';
                } else {
                    $scope.testSetting.time_type = 'limited';
                }
            });

            $scope.save = function (testSetting) {
                $scope.loading = true;
                testSetting.unlim_attempts = testSetting.attempts_type == 'unlim' ? 1 : 0;
                testSetting.all_questions = testSetting.questions_type == 'all' ? 1 : 0;
                testSettingObj = new testSettingsFactory(testSetting);
                testSettingObj.$save({courseId: $routeParams.id, testId: $routeParams.testId}, function (res) {
                    $scope.loading = false;
                    $location.path('/courses/'+$routeParams.id+'/plan');
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


            $scope.cancel = function () {
                $location.path('/courses/'+$routeParams.id+'/plan');
            }
        }]);
});