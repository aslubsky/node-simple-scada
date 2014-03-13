define(['app'], function(app) {

    app.controller('Users.ViewCtrl',  ['$scope', 'muUserFactory', '$routeParams', function($scope, muUserFactory, $routeParams) {

        $scope.user = '';
        $scope.user.photo = '';

        muUserFactory.get({id: $routeParams.id}, function (res) {
            $scope.loading = false;
            $scope.user = res;
            $scope.photo = res.photo;
        });

        $scope.$watch('user.photo', function(res){
            if(res != 'undefined' && res != $scope.photo){
                var user = new muUserFactory($scope.user);
                user.$register(function (res) {
                    $scope.loading = false;
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

        })

    }]);

});