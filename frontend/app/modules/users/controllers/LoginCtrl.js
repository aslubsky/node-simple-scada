define(['app'], function(app) {

    app.controller('LoginCtrl', ['$scope', '$location', 'bzUser', function($scope, $location, bzUser) {
        $scope.loginUser = function(user) {
            $scope.loading = true;
            if(user == undefined) {
                user = {};
            }
            user.password = $('#password').val();
            user.email = $('#email').val();
            bzUser.$login(user, function(res) {
                $scope.loading = false;
                if(res.need_edit == '1') {
                    $location.path('/profile/edit');
                }
            }, function(res) {
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