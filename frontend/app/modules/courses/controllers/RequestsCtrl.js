define(['app'], function (app) {

    app.controller('Course.RequestsCtrl', ['$scope', '$location', '$q', 'requestsFactory',  '$routeParams', 'ngTableParams',
        function ($scope, $location, $q, requestsFactory, $routeParams, ngTableParams) {
            /*var prms = {
                page: 1,            // show first page
                count: 10,          // count per page
                sorting: {
                },
                filter: {}

            };
            $scope.tableParams = new ngTableParams(prms, {
                total: 0,           // length of data
                getData: function ($defer, params) {
                    $scope.loading = true;
                    requestsFactory.getAvailableCourses(function (res) {
                        $scope.loading = false;
                        $defer.resolve($scope.courses = res.data);
                        $scope.tableParams.total(res.pager.total);
                    });
                }
            });*/
            requestsFactory.getAvailableCourses(function (res) {
                $scope.loading = false;
                $scope.courses = res.data;
            });
        }]);

});