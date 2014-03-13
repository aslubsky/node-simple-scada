define(['app'], function (app) {
    app.controller('Course.PlanCtrl', ['$scope', 'planFactory', 'coursesFactory', '$location', '$routeParams',
        function ($scope, planFactory, coursesFactory, $location, $routeParams) {

            $scope.type = 'page';
            $scope.materials = 'selected';
            $scope.search = null;
            $scope.elements = [];


            coursesFactory.get({id: $routeParams.id}, function (res) {
                $scope.loading = false;
                $scope.course = res;
            });

            planFactory.get({courseId: $routeParams.id}, function (res) {
                $scope.loading = false;
                $scope.plan = res.data;
            });


            $scope.$on('onParamsChanged', function () {
                if ($scope.materials == 'all') {
                    $scope.$watch('search', function (q) {
                        planFactory.getAllResources({courseId: $routeParams.id, type: $scope.type, title: q}, function (res) {
                            $scope.data = res.data;
                            $scope.loading = false;

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

                    $scope.$watch('searchByTags', function (q) {
                        planFactory.getAllResources({courseId: $routeParams.id, type: $scope.type, tag: q}, function (res) {
                            $scope.data = res.data;
                            $scope.loading = false;

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

                } else {

                    $scope.$watch('search', function (q) {
                        planFactory.getElementsResource({courseId: $routeParams.id, title: q}, function (res) {
                            $scope.loading = false;
                            $scope.elements = res.data;
                        });
                    });

                    $scope.$watch('searchByTags', function (q) {
                        planFactory.getElementsResource({courseId: $routeParams.id, tag: q}, function (res) {
                            $scope.loading = false;
                            $scope.elements = res.data;
                        });
                    });
                }
            });

            $scope.$watch('type', function (type) {
                $scope.$emit('onParamsChanged');
            });

            $scope.$watch('materials', function (materials) {
                $scope.$emit('onParamsChanged');
            });


            $scope.add = function (itm) {
                $scope.loading = true;
                resource = new planFactory(itm);
                resource.$create({courseId: $routeParams.id}, function (res) {
                    if ($scope.materials == 'selected') {
                        angular.forEach($scope.elements, function (i, n) {
                            if (i == itm) {
                                $scope.elements.splice(n, 1);
                                res.title = i.title;
                                res.sub_type = i.sub_type;
                                $scope.plan.push(res);
                            }
                        });
                    }

                    if ($scope.materials == 'all') {
//                        console.log($scope.data);
                        angular.forEach($scope.data, function (i, n) {
                            if (i == itm) {
                                $scope.data.splice(n, 1);
                                res.title = i.title;
                                res.sub_type = i.type;
                                $scope.plan.push(res);
                            }
                        });
//                        console.log($scope.plan);
                    }

                });
                $scope.loading = false;
            }

            $scope.$delete = function (el) {
                $scope.loading = true;
                resource = new planFactory(el);
                resource.$delete({courseId: $routeParams.id, id: el.id}, function () {
                    $scope.$emit('onParamsChanged');
                    angular.forEach($scope.plan, function (i, n) {
                        if (i == el) {
                            $scope.plan.splice(n, 1);
                        }
                    });
                });
                $scope.loading = false;
            }

            $scope.up = function (res) {
                angular.forEach($scope.plan, function (i, n) {
                    if (i == res && n !== 0) {
                        var elem = $scope.plan[n - 1];
                        $scope.plan[n - 1] = res;
                        $scope.plan[n] = elem;

                    }
                });
                $scope.resort();
            }

            $scope.down = function (item) {
                var l = $scope.plan.length - 1;
                // console.log(item);
                var plan = angular.copy($scope.plan),
                    fl = null;
                $scope.plan = [];
                angular.forEach(plan, function (i, n) {
                    if(fl!= null && fl == n) {
                        return;
                    }
                    if (i.id == item.id && n !== l) {
                        $scope.plan[n] = plan[n+1];
                        $scope.plan[n+1] = plan[n];
                        fl = n+1;
                    } else {
                        $scope.plan[n] = i;
                    }
                });
                $scope.resort();
            }

            $scope.resort = function () {
                var orders = {};
                angular.forEach($scope.plan, function (i, n) {
                    $scope.plan[n].order = n;
                    orders[i.id] = n;
                });
                // console.log($routeParams.id, orders);
                planFactory.resort({courseId: $routeParams.id, 'orders': orders}, function (res) {
                });
            }

            $scope.changeStartElement = function (res) {
                $scope.loading = true;
                resource = new planFactory(res);
                resource.$changeStartElement({courseId: $routeParams.id}, function (res) {
                    $scope.loading = false;
                });
            }

        }]);
});