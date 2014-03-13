define(['app'], function(app) {

    app.controller('ChangePasswordCtrl', ['$scope', '$location', '$q', 'muUserFactory', '$routeParams',
        function($scope, $location, $q, muUserFactory, $routeParams) {

            $scope.savePass = function(data){
                pass = new muUserFactory(data);
                $scope.loading = true;
                pass.$changePassword({id: $routeParams.id},function (res) {
                    $scope.loading = false;
                    if($routeParams.id){
                        $location.path('/users/view/'+$routeParams.id);
                    }else{
                        $location.path('/profile');
                    }
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
            $scope.cancel = function(){
                if($routeParams.id){
                    $location.path('/users/view/'+$routeParams.id);
                }else{
                    $location.path('/profile');
                }
            }

        }]);

});