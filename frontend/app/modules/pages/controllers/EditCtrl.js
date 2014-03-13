define(['app'], function (app) {
    app.controller('Pages.EditCtrl', ['$scope', 'ngTableParams', 'pagesFactory', 'bzConfig', 'categoriesFactory', '$location', '$routeParams', '$route',
        function ($scope, ngTableParams, pagesFactory, bzConfig, categoriesFactory, $location, $routeParams, $route) {

            $scope.page = { body: '' };
            pagesFactory.get({id: $routeParams.id}, function (res) {
                if (res.type == 'html') {
                    pagesFactory.getStartFiles({id: $routeParams.id}, function (data) {
                        $scope.page.files.start_files = data.start_files;
                    });
                }
                $scope.loading = false;
                $scope.page = res;
                $scope.select2Options.tags = res.tags;
//                console.log(res);
            });

            $scope.deleteFile = function (file) {
                angular.forEach($scope.page.images, function (item, i) {
                    if (item.url == file.url) {
                        $scope.page.images.splice(i, 1);
                    }
                });
            };

            $scope.save = function (page, reload) {
                if (page.type === 'html' && page.files.length) {
                    page.files = page.files[0];
                }
                page = new pagesFactory(page);
                page.$save(function (res) {
                    switch (reload) {
                        case 'close':
                            $location.path('/pages');
                            break;
                        case 'reload':
                            $scope.notify('Сохраненно', 'success');
                            $('.btn-primary.dropdown-toggle').click();
                            break;
                        case 'needPreview':
                            $location.path('/pages/' + res.id + '/view');
                            break;
                    }
                })
            };

            categoriesFactory.get(function (data) {
                var items = [];

                function walk(item, level) {
                    // 2 space per level
                    if (level > 0) { // without root item
                        item.prefix = new Array((level - 1) * 2 + 1).join(String.fromCharCode(160));
                        if (level > 1) { // only for childrens
                            item.prefix += '» ';
                        }
                        items.push(item);
                    }
                    for (var i = 0; i < item.children.length; i++) {
                        walk(item.children[i], level + 1);
                    }
                }

                walk(data, 0);
                $scope.categories = items;
            });

            $scope.cancel = function () {
                $location.path('/pages');
            }

        }]);
});