define(['app'], function(app) {
    app.controller('Course.TestResultCtrl', ['$scope', 'ngTableParams', 'coursesFactory', 'tasksFactory', '$location', '$routeParams',
        function ($scope, ngTableParams, coursesFactory, tasksFactory, $location, $routeParams) {
//            console.log('TestResultCtrl');

            /*coursesFactory.get({id: $routeParams.id}, function (res) {
                $scope.loading = false;
                $scope.course = res;
            });
            tasksFactory.get({id: $routeParams.taskId, 'mode': true}, function (res) {
                $scope.loading = false;
                $scope.testTask = res;
            });

            var prms = angular.extend({
                page: 1,            // show first page
                count: 10,          // count per page
                sorting: {
                    date: 'desc',
                    id: 'desc'
                },
                id: $routeParams.id,
                task_id: $routeParams.taskId,
                filter: {}

            }, $location.search());

            $scope.tableParams = new ngTableParams(prms, {
                total: 0,           // length of data
                getData: function ($defer, params) {
                    $location.search(params.url()); // put params in url
                    $scope.loading = true;
                    coursesFactory.getReport(params.url(), function (res) {
                        $scope.loading = false;
                        $defer.resolve($scope.reportItems = res.data);
                        $scope.tableParams.total(res.pager.total);
                    });
                }
            });*/
        }]);
});