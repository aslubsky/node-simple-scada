define(['app'], function (app) {
    app.controller('Course.ElementsCtrl', ['$scope', 'elementsFactory', 'coursesFactory', 'categoriesFactory', '$location', '$routeParams', 'ngTableParams',
        function ($scope, elementsFactory, coursesFactory, categoriesFactory, $location, $routeParams, ngTableParams) {

            $scope.type = 'All';
            $scope.search = null;
            $scope.elements = [];
            $scope.categoryFilter = false;

            coursesFactory.get({id: $routeParams.id}, function (res) {
                $scope.loading = false;
                $scope.course = res;
            });

            categoriesFactory.get(function (res) {
                $scope.categories = res.children;
            });

            elementsFactory.get({courseId: $routeParams.id}, function (res) {
                $scope.loading = false;
                $scope.elements = res.data;
            });

            $scope.$watch('type', function (type) {
                $scope.type = type;

                if ($scope.type != 'test' && $scope.type != 'All') {
                    $scope.categoriesFilter = true;
                } else {
                    $scope.categoriesFilter = false;
                    $scope.category = null;
                }

                $scope.$watch('search', function (q) {
                    elementsFactory.getAllResources({courseId: $routeParams.id, type: $scope.type, title: q}, function (res) {
                        $scope.data = res.data;
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

                $scope.$watch('searchByTags', function (q) {
                    elementsFactory.getAllResources({courseId: $routeParams.id, type: $scope.type, tag: q}, function (res) {
                        $scope.data = res.data;
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

                $scope.$watch('category', function (q) {
                    elementsFactory.getAllResources({courseId: $routeParams.id, type: $scope.type, categoryId: q}, function (res) {
                        console.log(res);
                        $scope.data = res.data;
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


            });


            $scope.add = function (itm) {
                $scope.loading = true;
                resource = new elementsFactory(itm);
                resource.$create({courseId: $routeParams.id}, function (res) {
                    //console.log(res);
                    angular.forEach($scope.data, function (i, n) {
                        if (i == itm) {
                            $scope.data.splice(n, 1);
                            res.title = i.title;
                            res.code = i.code;
                            res.description = i.description;
                            console.log(i)
                            $scope.elements.push(res);
                        }
                    });
                });
                $scope.loading = false;
            }

            $scope.$delete = function (el) {
                $scope.loading = true;
                resource = new elementsFactory(el);
                resource.$delete({courseId: $routeParams.id, elementId: el.id}, function () {
                    angular.forEach($scope.elements, function (i, n) {
                        if (i == el) {
                            $scope.elements.splice(n, 1);
                            if (el.type == $scope.type) {
                                $scope.data.push(i);
                            }
                        }
                    });
                });
                $scope.loading = false;
            }

            $scope.up = function (res) {
                angular.forEach($scope.elements, function (i, n) {
                    if (i == res && n !== 0) {
                        var elem = $scope.elements[n - 1];
                        $scope.elements[n - 1] = res;
                        $scope.elements[n] = elem;

                    }
                });
                $scope.resort();
            }

            $scope.down = function (item) {
                var l = $scope.elements.length - 1;
                var elements = angular.copy($scope.elements),
                    fl = null;
                $scope.elements = [];
                angular.forEach(elements, function (i, n) {
                    if (fl != null && fl == n) {
                        return;
                    }
                    if (i.id == item.id && n !== l) {
                        $scope.elements[n] = elements[n + 1];
                        $scope.elements[n + 1] = elements[n];
                        fl = n + 1;
                    } else {
                        $scope.elements[n] = i;
                    }
                });
                $scope.resort();
            }

            $scope.resort = function () {
                var orders = {};
                angular.forEach($scope.elements, function (i, n) {
                    $scope.elements[n].order = n;
                    orders[i.id] = n;
                });
                //console.log($routeParams.id, orders);
                elementsFactory.resort({courseId: $routeParams.id, 'orders': orders}, function (res) {

                });
            }

            $scope.createAndConnect = function (type) {
                if (type && type != 'test') {
                    window.location = "pages/create?type=" + type + "&courseId=" + $routeParams.id;
                } else {
                    window.open("tests/create?courseId=" + $routeParams.id, '_blank');
                }
            };


        }]);
});