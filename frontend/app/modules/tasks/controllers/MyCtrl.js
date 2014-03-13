define(['app'], function (app) {

    app.controller('Tasks.MyCtrl', ['$scope', '$location', '$q', 'ngTableParams', 'tasksFactory', '$filter',
        function ($scope, $location, $q, ngTableParams, tasksFactory, $filter) {

            var prms = angular.extend({
                page: 1,            // show first page
                count: 10,          // count per page
                sorting: {
                    id: 'desc'
                },
                filter: {
                }

            }, $location.search());

            $scope.tableParams = new ngTableParams(prms, {
                total: 0,           // length of data
                getData: function ($defer, params) {
                    $location.search(params.url()); // put params in url
                    $scope.loading = true;
                    tasksFactory.getMy(params.url(), function (res) {
                        $scope.loading = false;
                        $defer.resolve($scope.tasks = res.data);
                        $scope.tableParams.total(res.pager.total);
                        $scope.tableParams.page(res.pager.current);
                    });
                }

            });

            $scope.filterTypes = function ($column) {
                var def = $q.defer(),
                    names = [
                        {
                            'id': 'test',
                            'title': 'Тест'
                        },
                        {
                            'id': 'resource',
                            'title': 'Ресурс'
                        },
                        {
                            'id': 'course',
                            'title': 'Курс'
                        }
                    ];
                def.resolve(names);
                return def;
            };

            $scope.filterStatus = function ($column) {
                var def = $q.defer(),
                    statuses = [
                        {
                            'id': 'not_started',
                            'title': 'Не начато'
                        },
                        {
                            'id': 'inprogress',
                            'title': 'В процессе'
                        },
                        {
                            'id': 'finished',
                            'title': 'Выполненно'
                        },
                        {
                            'id': 'started',
                            'title': 'Начато'
                        }
                    ];
                def.resolve(statuses);
                return def;
            };
        }]);
});