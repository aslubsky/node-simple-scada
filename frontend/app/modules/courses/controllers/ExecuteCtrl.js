define(['app'], function (app) {

    app.controller('Course.ExecuteCtrl', ['$scope', '$location', '$q', 'tasksFactory', 'coursesFactory', 'planFactory', '$routeParams',
        function ($scope, $location, $q, tasksFactory, coursesFactory, planFactory, $routeParams) {

            var prms = {
                id: $routeParams.taskId
            };
            if ($routeParams.mode) {
                prms.mode = $routeParams.mode;
                $location.$$search.mode = $routeParams.mode;
                $scope.mode = $routeParams.mode;
            }
            tasksFactory.get(prms, function (res) {
                console.log(res);
                $scope.loading = false;
                $scope.task = res;
                $scope.course = res.element;


                /*if ($routeParams.course) {
                    if (res.type == 'test') {
                        angular.forEach(res.plan, function (i, k) {
                            if (i.id == res.id) {
                                if (res.plan[k - 1].type == 'resource') {
                                    $location.path('/pages/execute/' + res.plan[k - 1].id);
                                } else {
                                    $location.path('/tests/execute/' + res.plan[k - 1].id);
                                }
                            }
                        })
                    }
                }*/

                if (res.start_element && $routeParams.restore) {
                    if (res.start_element.type == 'resource') {
                        $location.path('/pages/execute/' + res.start_element.id);
                    }
                    if (res.start_element.type == 'test') {
                        $location.path('/tests/execute/' + res.start_element.id);
                    }
                }
                switch (res.element.start_type) {
                    case 'plan':
                        break;
                    case 'elements':
                        $location.path('/courses/materials/' + $routeParams.taskId);
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
        }]);
});