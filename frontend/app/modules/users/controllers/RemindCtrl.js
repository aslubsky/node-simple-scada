define(['app'], function(app) {

    app.controller('RemindCtrl',
        ['$scope', '$rootScope', '$location', 'muUserFactory', '$routeSegment', 'bzUser',
            function ($scope, $rootScope, $location, UserResource, $routeSegment, bzUser) {

                $scope.savePass = function(res){
                    pass = new UserResource(res);
                    $scope.loading = true;
                    pass.$recoveryPassword({
                        'id': $routeSegment.$routeParams.user_id,
                        'key': $routeSegment.$routeParams.key
                    },function (res) {
                        $scope.loading = false;
                        bzUser.$set(res);
                        $location.path('/');
                    }, function (res) {
                        $scope.loading = false;
                        if (res.status == 400) {
                            $scope.errors = res.data;
                        }
                        if (res.status == 500) {
                            $scope.notify(res.status, 'danger');
                        }
                    });

                }


            }]);

});