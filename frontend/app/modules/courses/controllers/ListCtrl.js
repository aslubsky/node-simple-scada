define(['app'], function (app) {
    app.controller('Courses.ListCtrl',
        ['$scope', '$routeSegment', 'coursesFactory', 'ngTableParams', '$filter', '$q', '$location',
            function ($scope, $routeSegment, coursesFactory, ngTableParams, $filter, $q, $location) {


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
                        coursesFactory.get(params.url(), function (res) {
                            $scope.loading = false;
                            $defer.resolve($scope.courses = res.data);
                            $scope.tableParams.total(res.pager.total);
                            $scope.tableParams.page(res.pager.current);
                        });
                    }

                });

                $scope.remove = function (course) {
                    var obj = new coursesFactory(course);
                    $scope.loading = true;
                    obj.$delete({id: course.id}, function (res) {
                        angular.forEach($scope.courses, function (i, n) {
                            if (i == course) {
                                $scope.courses.splice(n, 1);
                            }
                        });
                        $scope.loading = false;
                    });
                    return false;
                }

                $scope.checkboxes = { 'checkedAll': false, 'checkedAny': false, items: {} };

                $scope.$watch('checkboxes.checkedAll', function (value) {
                    angular.forEach($scope.courses, function (item) {
                        if (angular.isDefined(item.id)) {
                            $scope.checkboxes.items[item.id] = value;
                        }
                    });
                });

                $scope.$watch('checkboxes.items', function (values) {
                    if (!$scope.courses) {
                        return;
                    }
                    var checked = 0, unchecked = 0,
                        total = $scope.courses.length;
                    angular.forEach($scope.courses, function (item) {
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
                    del = new coursesFactory({ids: $scope.ids});
                    del.$deleteMulti(function () {
                        $scope.ids = [];
                        $scope.tableParams.reload();
                    })
                }


            }]);
});