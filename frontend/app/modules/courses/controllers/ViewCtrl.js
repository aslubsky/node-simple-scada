define(['app'], function(app) {
    app.controller('Course.ViewCtrl', ['$scope', 'ngTableParams', 'coursesFactory', '$location', '$routeParams', '$sce',
        function ($scope, ngTableParams, coursesFactory, $location, $routeParams, $sce) {
            $scope.preview = true;
            coursesFactory.get({id: $routeParams.id, include_plan: true, include_materials: true}, function (res) {
                $scope.loading = false;
                $scope.course = res;
            });
        }]);
});