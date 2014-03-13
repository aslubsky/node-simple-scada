define(['app'], function (app) {

    app.controller('Tests.EditCtrl', ['$scope', '$location', '$q', 'testsFactory', 'bzConfig', '$routeParams',
        function ($scope, $location, $q, testsFactory, bzConfig, $routeParams) {

            $scope.data = {};
            testsFactory.get({id: $routeParams.id}, function (res) {
                $scope.loading = false;
                $scope.data = res;
                $scope.select2Options.tags = res.tags;
            });

            $scope.saveTest = function (test) {
                var testObj = new testsFactory(test);
                $scope.loading = true;
                testObj.$save({id: $routeParams.id}, function (res) {
                    $scope.loading = false;
                    $location.path('/tests');
                }, function (res) {
                    $scope.loading = false;
                    if (res.status == 400) {
                        $scope.errors = res.data;
                        $scope.notify(res.data.id, 'danger');
                    }
                    if (res.status == 500) {
                        $scope.notify(res.status, 'danger');
                    }
                });
            }

            $scope.cancel = function () {
                $location.path('/tests');
            }

        }]);

});