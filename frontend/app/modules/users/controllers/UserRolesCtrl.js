define(['app'], function (app) {

    app.controller('UserRolesCtrl', ['$scope', '$location', '$q', 'ngTableParams', 'muUserFactory', 'muRoleFactory', '$routeParams',
        function ($scope, $location, $q, ngTableParams, muUserFactory, muRoleFactory, $routeParams) {


            muRoleFactory.get( function (res) {
                $scope.loading = false;
                $scope.roles = res.data;
            });
            $scope.userRoles = [];
            muUserFactory.get({id: $routeParams.id}, function (res) {
                $scope.loading = false;
                $scope.userRoles = res;
            });

            $scope.data = {};

            $scope.changeRoles = function(res){
                $scope.ids = [];
                angular.forEach(res.roles, function(value, key){
                    $scope.ids.push(value);
                });
                roles = new muUserFactory({
                    'roles': $scope.ids
                });
                $scope.loading = true;
                roles.$saveUserRoles({id: $routeParams.id},function (res) {
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
            $scope.cancel = function () {
                $location.path('/users');
            }

        }]);

});