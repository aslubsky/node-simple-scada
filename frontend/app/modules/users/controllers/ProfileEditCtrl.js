define(['app'], function (app) {

    app.controller('ProfileEditCtrl', ['$scope', '$location', '$q', 'ngTableParams', 'muUserFactory', 'bzUser',
        function ($scope, $location, $q, ngTableParams, muUserFactory, bzUser) {

            //        $scope.user = $scope.$user;

            $scope.gender = [
                {id: 'unknown', title: '- не указано'},
                {id: 'male', title: 'Муж.'},
                {id: 'female', title: 'Жен.'}
            ];

            muUserFactory.get({id: $scope.$user.id}, function (res) {
                $scope.loading = false;
                $scope.user = res;
            });

            //console.log($scope.user);
            $scope.saveUser = function (data) {
                user = new muUserFactory(data);
                $scope.loading = true;
                user.$register(function (res) {
                    $scope.loading = false;
                    bzUser.$update(function(){
                        window.location = '/profile';
//                        $location.path('/profile');
                    });
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
            $scope.deletePhoto = function () {
                $scope.user.photo = '';
            }
            $scope.cancel = function () {
                $location.path('/profile');
            }

        }]);

});