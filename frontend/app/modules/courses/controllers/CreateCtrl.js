define(['app'], function(app) {
    app.controller('Course.CreateCtrl', ['$scope', 'ngTableParams', 'coursesFactory', '$location', 'bzConfig',
        function ($scope, ngTableParams, CoursesResource, $location, bzConfig) {

            $scope.data = {};
            $scope.courseId = '';
            $scope.data.start_type = 'start_page';
            $scope.data.finish_type = 'summary';

            $scope.courseTests = [];


            $scope.save = function(data, reload) {
                data.id = $scope.courseId;
                course = new CoursesResource(data);
                course.$save(function(res) {
                    if(res.id){
                        $scope.courseId = res.id;
                    }
                    switch (reload) {
                        case 'close':
                            $location.path('/courses');
                            break;
                        case 'reload':
                            $scope.notify('Сохраненно', 'success');
                            $('.btn-primary.dropdown-toggle').click();
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

            $scope.deleteIcon = function(){
                $scope.data.icon = '';
            }

            $scope.cancel = function(){
                $location.path('/courses');
            }

        }]);
});
