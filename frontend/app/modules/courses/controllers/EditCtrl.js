define(['app'], function (app) {
    app.controller('Course.EditCtrl', ['$scope', 'ngTableParams', 'coursesFactory', 'bzConfig', 'planFactory', '$location', '$routeParams',
        function ($scope, ngTableParams, coursesFactory, bzConfig, planFactory, $location, $routeParams) {

            $scope.courseTests = [];

            $scope.loading = true;
            $scope.data = {};
            coursesFactory.get({id: $routeParams.id}, function (res) {
                $scope.loading = false;
                $scope.data = res;
                $scope.select2Options.tags = res.tags;
//                console.log(res);
            });

            planFactory.get({courseId: $routeParams.id, type: 'test'}, function (res) {
                $scope.loading = false;
                $scope.courseTests = res.data;
            });


            $scope.save = function (data, reload) {
                var course = new coursesFactory(data);
                course.$save(function (res) {
                    switch (reload) {
                        case 'close':
                            $location.path('/courses');
                            break;
                        case 'reload':
                            $('.btn-primary.dropdown-toggle').click();
                            $scope.notify('Сохраненно', 'success');
                            break;
                        case 'needPreview':
                            $location.path('/courses/' + res.id + '/view');
                            break;
                    }
                }, function (res) {
                    $scope.loading = false;
                    if (res.status == 400) {
                        $scope.errors = res.data;
                        $scope.notify(res.data.id, 'danger');
                    }
                    if (res.status == 500) {
                        $scope.notify(res.status, 'danger');
                    }
                })
            };

            $scope.deleteIcon = function () {
                $scope.data.icon = '';
            }

            $scope.cancel = function () {
                $location.path('/courses');
            }
        }]);
});