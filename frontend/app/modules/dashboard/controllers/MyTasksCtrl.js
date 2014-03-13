define(['app'], function(app) {
    app.controller('Dashboard.MyTasksCtrl', ['$scope', '$location', 'tasksFactory', '$routeParams',
        function($scope, $location, tasksFactory, $routeParams) {
//            console.log('Dashboard');
            tasksFactory.getMy({
                page: 1,
                count: 5
            }, function (res) {
                $scope.loading = false;
//                console.log(res.data);
                $scope.tasks = res.data;
            });
        }]);
});