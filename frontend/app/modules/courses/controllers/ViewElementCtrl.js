define(['app'], function(app) {
    app.controller('Course.ViewElementCtrl', ['$scope', '$location', '$q', 'tasksFactory', 'elementsFactory', '$routeParams',
        function ($scope, $location, $q, tasksFactory, elementsFactory, $routeParams) {
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
                $scope.course = res.element;

                elementsFactory.get({elementId: $routeParams.elementId, courseId: $scope.task.element_id}, function (res) {
                    $scope.loading = false;
                    $scope.data = res;
                    $scope.images = res.images;
                    $scope.iframe = '<iframe frameborder="0" src="' + res.url + '" width="100%" height="500" align="top"></iframe>';
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