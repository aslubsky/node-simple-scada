define(['app'], function (app) {
    app.controller('Course.UsersCtrl', ['$scope', 'usersFactory', 'coursesFactory', '$location', '$routeParams', 'ngTableParams',
        function ($scope, usersFactory, coursesFactory, $location, $routeParams, ngTableParams) {
            $scope.search = null;

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
                filter: {}

            }, $location.search());

            $scope.tableParams = new ngTableParams(prms, {
                total: 0,           // length of data
                getData: function ($defer, params) {

                    $location.search(params.url()); // put params in url
                    $scope.loading = true;
                    params.$params.id = $routeParams.id;
                    coursesFactory.getAssignUsers(params.url(), function (res) {
                        $scope.loading = false;
                        $defer.resolve($scope.users = res.data);
                        $scope.tableParams.total(res.pager.total);
                        $scope.tableParams.page(res.pager.current);
                    });
                }

            });

        }]);
});