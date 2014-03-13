define(['app'], function(app) {

    app.controller('Users.CreateCtrl', ['$scope', '$location', '$q', 'muUserFactory',
        function($scope, $location, $q, muUserFactory) {


            $scope.saveUser = function(data){
                user = new muUserFactory(data);
                $scope.loading = true;
                user.$create(function (res) {
                    $scope.loading = false;
                    $location.path('/users');
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

            $scope.deletePhoto = function(){
                $scope.user.photo = '';
            }

            $scope.cancel = function(){
                $location.path('/users');
            }

        }]);

});