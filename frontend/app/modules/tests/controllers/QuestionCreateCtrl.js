define(['app'], function(app) {

    app.controller('Tests.QuestionCreateCtrl', ['$scope', '$location', '$q', 'testsFactory', 'questionsFactory', '$routeParams',
        function($scope, $location, $q, testsFactory, questionsFactory, $routeParams) {

            testsFactory.get({id: $routeParams.test_id}, function (res) {
                $scope.test = res;
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

            $scope.data = {};
            $scope.data.test_id = $routeParams.test_id;
            $scope.data.type = 'single';

            $scope.saveQuestion = function(data, reload){
                question = new questionsFactory(data);
                $scope.loading = true;
                question.$create({testId: $routeParams.test_id},function (res) {
                    $scope.loading = false;
                    switch (reload) {
                        case 'close':
                            $location.path('/tests/'+$routeParams.test_id+'/questions/edit/'+res.id);
                            break;
                        case 'reload':
                            $scope.notify('Сохраненно', 'success');
                            $('.btn-primary.dropdown-toggle').click();
                            break;
                        case 'new':
                                window.location.reload();
                            break;
                    }


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

            $scope.cancel = function(){
                $location.path('tests/'+$routeParams.test_id+'/questions');
            }

        }]);

});