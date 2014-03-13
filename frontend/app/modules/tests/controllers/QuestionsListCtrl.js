define(['app'], function(app) {

    app.controller('Tests.QuestionsListCtrl',
        ['$scope', '$location', '$q', 'ngTableParams', 'testsFactory', 'questionsFactory', '$filter', '$routeParams', '$sce',
        function($scope, $location, $q, ngTableParams, testsFactory, questionsFactory, $filter, $routeParams, $sce) {

            $scope.url = $routeParams;
            testsFactory.get({id: $routeParams.test_id}, function (res) {
                $scope.test = res;
            });

            var prms = angular.extend({
                page: 1,            // show first page
                count: 10,          // count per page
                sorting: {
                    date: 'desc',
                    id: 'desc'
                },
                filter: {}

            }, $location.search());

            $scope.tableParams = new ngTableParams(prms, {
                total: 0,           // length of data
                getData: function ($defer, params) {

                    $location.search(params.url()); // put params in url
                    $scope.loading = true;
                    params.$params.testId =  $routeParams.test_id
                    questionsFactory.get(params.url(), function (res) {
                        $scope.loading = false;
                        //console.log(res);
                        $defer.resolve($scope.questions = res.data);
                        $scope.tableParams.total(res.pager.total);
                        $scope.tableParams.page(res.pager.current);
                    });
                }
            });

            $scope.getHtml = function(html) {
                var el = $(html);
                el.find('img').removeAttr('style');
                return $sce.trustAsHtml('<p>'+el.html()+'</p>');
            };

            $scope.remove = function(question) {
                var obj = new questionsFactory(question);
                $scope.loading = true;
                obj.$delete({id: question.id}, function(res) {
                    angular.forEach($scope.questions, function(i, n){
                        if (i == question) {
                            $scope.questions.splice(n, 1);
                        }
                    });
                    $scope.loading = false;
                });
                return false;
            }

            $scope.filterTypes = function (column) {
                var def = $q.defer();
                    def.resolve([{id: 'single', title: 'Одиночный'}, {id: 'multi', title: 'Множественный'}]);
                return def;
            };

            $scope.checkboxes = { 'checkedAll': false, 'checkedAny': false, items: {} };

            $scope.$watch('checkboxes.checkedAll', function (value) {
                angular.forEach($scope.questions, function (item) {
                    if (angular.isDefined(item.id)) {
                        $scope.checkboxes.items[item.id] = value;
                    }
                });
            });

            $scope.$watch('checkboxes.items', function (values) {
                if (!$scope.questions) {
                    return;
                }
                var checked = 0, unchecked = 0,
                    total = $scope.questions.length;
                angular.forEach($scope.questions, function (item) {
                    checked += ($scope.checkboxes.items[item.id]) || 0;
                    unchecked += (!$scope.checkboxes.items[item.id]) || 0;
                });
                if ((unchecked == 0) || (checked == 0)) {
                    $scope.checkboxes.checkedAll = (checked == total);
                }
                $scope.checkboxes.checkedAny = (checked > 0);
                // grayed checkbox
                angular.element(document.getElementById("select_all")).prop("indeterminate", (checked != 0 && unchecked != 0));
            }, true);

            $scope.deleteChecked = function (res) {
                $scope.ids = [];
                angular.forEach(res, function (i, n) {
                    if (i == true) {
                        $scope.ids.push(n);
                    }

                });
                if($scope.ids.length == 0) {
                    return;
                }
                del = new questionsFactory({ids: $scope.ids});
                del.$deleteMulti({testId: $routeParams.testId},function () {
                    $scope.ids = [];
                    $scope.tableParams.reload();
                })
            }



        }]);

});