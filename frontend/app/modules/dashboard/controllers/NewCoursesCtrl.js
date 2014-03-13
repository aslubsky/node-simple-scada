define(['app'], function(app) {
    app.controller('Dashboard.NewCoursesCtrl', ['$scope', '$location', 'requestsFactory', '$routeParams',
        function($scope, $location, requestsFactory, $routeParams) {
//            console.log('Dashboard');
            requestsFactory.getAvailableCourses({
                page: 1,
                count: 4,
                'sorting[id]': 'desc'
            }, function (res) {
                $scope.loading = false;
//                console.log(res.data);
                $scope.courses = res.data;
            });

            $scope.registerOnCourse = function(){
                setTimeout(function(){
                    $('a.registration').click();
                }, 200);
            };
        }]);
});