define(['app'], function(app) {

    app.controller('ActivationCtrl',
        ['$scope', '$rootScope', '$location', 'muUserFactory', '$routeSegment',
            function ($scope, $rootScope, $location, UserResource, $routeSegment) {

                $scope.loading = true;
                UserResource.activate({
                    'id': $routeSegment.$routeParams.user_id,
                    'key':     $routeSegment.$routeParams.key
                }, function(user) {
                    $scope.loading = false;
                    $rootScope.user_activated = true;
                    window.location.href = '/profile/edit';
                }, function(res) {
                    $scope.loading = false;
                    if (res.status == 500) {
                        $scope.notify(res.status, 'danger');
                    }
                    if (res.status == 400) {
                        $scope.errors = res.data
                    } else {
                        $scope.error = true;
                    }
                });

            }]);

});