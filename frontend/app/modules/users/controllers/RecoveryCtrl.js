define(['app'], function (app) {

    app.controller('RecoveryCtrl', ['$scope', '$location', 'muUserFactory', '$q',
        function ($scope, $location, muUserFactory) {

            $scope.resendPassword = function (res) {
                res = new muUserFactory(res);
                $scope.loading = true;
                res.$recovery(function (res) {
                    $scope.loading = false;
                    $scope.sending = true;
                    $scope.errors = null;
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