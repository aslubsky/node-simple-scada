define(['app'], function (app) {
    app.controller('Pages.ExecuteCtrl', ['$scope', 'pagesFactory', 'planFactory', 'tasksFactory', '$routeParams', '$location',
        function ($scope, pagesFactory, planFactory, tasksFactory, $routeParams, $location) {

            $scope.loading = true;

            var prms = {
                id: $routeParams.taskId
            };
            if ($routeParams.mode) {
                prms.mode = $routeParams.mode;
                $location.$$search.mode = $routeParams.mode;
                $scope.mode = $routeParams.mode;
            }

            tasksFactory.get(prms, function (res) {
                $scope.loading = false;
                $scope.task = res;

                pagesFactory.get({id: $scope.task.element_id}, function (data) {
                    $scope.data = data;
                    if(data.type === 'html'){
                        if(data.files.length > 0){
                            var str =  data.files[0].index_page.split('.');
                            if(str[str.length-1] == 'swf'){
                                $scope.flash = data.files[0].url+'/'+data.files[0].index_page;
                            }else{
                                $scope.flash = false;
                                $scope.multiResource = '<iframe frameborder="0" src="'+data.files[0].url+'/'+data.files[0].index_page+'" width="100%" height="500" align="top"></iframe>';

                            }
                        }
                    }
                    $scope.images = data.images;
                    $scope.iframe = '<iframe src="' + data.url + '" width="100%" height="500" align="top"></iframe>';
                    $scope.loading = false;
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

            $scope.markAsComplete = function () {
                tasksFactory.markAsComplete(prms, function (res) {
                    if (res && res.id) {
                        if (res.type == 'resource') {
                            $location.path('/pages/execute/' + res.id);
                        }
                        if (res.type == 'test') {
                            $location.path('/tests/execute/' + res.id);
                        }
                    } else {
                        $location.path('/courses/finish/' + $scope.task.parent_id);
                    }
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