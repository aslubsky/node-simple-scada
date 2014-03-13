define(['app'], function(app) {
    app.controller('Course.ReportCtrl', ['$scope', 'ngTableParams', 'coursesFactory', '$location', '$routeParams',
        function ($scope, ngTableParams, coursesFactory, $location, $routeParams) {
            coursesFactory.get({id: $routeParams.id}, function (res) {
                $scope.loading = false;
                $scope.course = res;
            });

            var prms = angular.extend({
                page: 1,            // show first page
                count: 10,          // count per page
                sorting: {
                    date: 'desc',
                    id: 'desc'
                },
                id: $routeParams.id,
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
                        $scope.planItems = res.plan;
                        $scope.tableParams.total(res.pager.total);
                        $scope.tableParams.page(res.pager.current);
                    });
                }
            });
        }]);
});