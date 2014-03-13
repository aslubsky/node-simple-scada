define(['app'], function(app) {
    app.controller('Course.ViewElementsCtrl', ['$scope', '$location', '$q', 'tasksFactory', 'coursesFactory', '$routeParams',
        function ($scope, $location, $q, tasksFactory, coursesFactory, $routeParams) {


            $scope.taskId = $routeParams.taskId;
            $scope.course = {
                materials: []
            };
            var prms = {
                id: $routeParams.taskId
            };
            if ($routeParams.mode) {
                prms.mode = $routeParams.mode;
                $scope.mode = $routeParams.mode;
            }
            tasksFactory.get(prms, function (res) {
                $scope.loading = false;
                $scope.task = res;

                coursesFactory.get({id: $scope.task.element_id, include_materials: true}, function (res) {
                    $scope.loading = false;
                    $scope.course = res;
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