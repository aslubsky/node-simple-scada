define(['app'], function(app) {

    app.controller('Users.EditCtrl', ['$scope', '$location', '$q', 'ngTableParams', 'muUserFactory', 'muRoleFactory', '$routeParams',
        function($scope, $location, $q, ngTableParams, muUserFactory, muRoleFactory, $routeParams) {

            $scope.canEditDisable = true;

            $scope.gender = [
                {id: 'unknown', title: '- не указано'},
                {id: 'male', title: 'Муж.'},
                {id: 'female', title: 'Жен.'}
            ];

            muUserFactory.get({id: $routeParams.id}, function (res) {
                $scope.loading = false;
                res.is_active = !res.is_active;
                $scope.user = res;
                if($scope.user.gender == 'unknown'){
                    $scope.user.gender = 'unknown'
                }
            });

            $scope.saveUser = function(data){
                data.is_active = !data.is_active;
                user = new muUserFactory(data);
                $scope.loading = true;
                user.$register(function (res) {
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