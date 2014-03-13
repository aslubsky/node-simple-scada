define(['app'], function(app) {

    app.controller('RolesCtrl', ['$scope', '$location', '$q', 'ngTableParams', 'muUserFactory', 'muRoleFactory',
        function($scope, $location, $q, ngTableParams, muUserFactory, muRoleFactory) {

            $scope.loading = true;
            muRoleFactory.get(function (res) {
                $scope.loading = false;
                $scope.roles = res.data;
            });


        }]);

});