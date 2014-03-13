define(['app'], function(app) {
    app.controller('Course.ViewFinishCtrl', ['$scope', '$location', '$q', 'tasksFactory', '$routeParams',
        function ($scope, $location, $q, tasksFactory, $routeParams) {

            $scope.loading = true;

            tasksFactory.get({id: $routeParams.taskId}, function (res) {
                $scope.loading = false;
                $scope.task = res;
                $scope.completePercent = res;
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