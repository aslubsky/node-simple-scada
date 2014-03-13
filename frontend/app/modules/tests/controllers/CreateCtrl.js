define(['app'], function(app) {

    app.controller('Tests.CreateCtrl', ['$scope', '$location', '$q', 'testsFactory', 'bzConfig', 'elementsFactory', '$routeParams',
        function($scope, $location, $q, testsFactory, bzConfig, elementsFactory, $routeParams) {


            $scope.testId = '';

            $scope.saveTest = function(data){
                test = new testsFactory(data);
                $scope.loading = true;
                test.$save(function (res) {
                    $scope.testId = res.id;
                    $scope.loading = false;
                    $location.path('/tests/'+res.id+'/questions');
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
                if($routeParams.courseId){
                    $scope.$watch('testId', function(id){
                        if(id){
                            var test = {id: id, type: 'test'}
                            elem = new elementsFactory(test);
                            elem.$create({courseId: $routeParams.courseId}, function(res){
                            });
                        }
                    });
                }
            }


            $scope.cancel = function(){
                $location.path('/tests');
            }

        }]);

});