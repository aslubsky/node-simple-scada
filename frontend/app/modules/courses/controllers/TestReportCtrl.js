define(['app'], function(app) {
    app.controller('Course.TestReportCtrl', ['$scope', 'ngTableParams', 'coursesFactory', 'tasksFactory', '$location', '$routeParams',
        function ($scope, ngTableParams, coursesFactory, tasksFactory, $location, $routeParams) {
            coursesFactory.get({count: 500}, function (res) {
                $scope.loading = false;
                $scope.courses = res.data;
                if($routeParams.id) {
                    angular.forEach($scope.courses, function(itm){
                        if(itm.id == $routeParams.id) {
                            $scope.course = itm;
                        }
                    });
                }
            });


            $scope.$watch('courseId', function(val){
                if($scope.courseId) {
                    $scope.testTasks = [];
                    $scope.reportItems = [];
                    coursesFactory.getTests({id: $scope.courseId}, function(res){
                        $scope.testTasks = res.data;
                    });
                }
                if($scope.courseId != $routeParams.id) {
                    $scope.taskId = null;
                } else {
                    $scope.taskId = $routeParams.taskId;
                }
                $scope.$emit('onParamsChanged');
            });
            $scope.$watch('taskId', function(){
                if($scope.courseId && $scope.taskId) {
                    $location.path('/courses/'+$scope.courseId+'/test-report/'+$scope.taskId);
                }
            });

            if($routeParams.id) {
                $scope.courseId = $routeParams.id;
            }
            if($routeParams.taskId) {
                $scope.taskId = $routeParams.taskId;
            }


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
                    if(params.$params.id && params.$params.task_id) {
                        $location.search(params.url()); // put params in url
                        $scope.loading = true;
                        coursesFactory.getTestReport(params.url(), function (res) {
                            $scope.loading = false;
                            $defer.resolve($scope.reportItems = res.data);
                            $scope.tableParams.total(res.pager.total);
                            $scope.tableParams.page(res.pager.current);
                        });
                    }
                }
            });

            $scope.$on('onParamsChanged', function(){
                $scope.tableParams.$params.id = $scope.courseId;
                $scope.tableParams.$params.task_id = $scope.taskId;
            });

            $scope.$emit('onParamsChanged');
        }]);
});