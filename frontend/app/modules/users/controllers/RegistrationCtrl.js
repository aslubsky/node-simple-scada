define(['app'], function(app) {

    app.controller('RegistrationCtrl', ['$scope', '$location', 'muUserFactory', function($scope, $location, muUserFactory) {
        $scope.registerUser = function(user) {
            user = new muUserFactory(user);
            $scope.loading = true;
            user.$register(function (res) {
                $scope.loading = false;
                $scope.registrationComplete = true;
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