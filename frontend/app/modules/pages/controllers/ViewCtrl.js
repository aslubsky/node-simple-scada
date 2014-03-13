define(['app'], function(app) {
    app.controller('Pages.ViewCtrl', ['$scope', 'pagesFactory', '$routeParams', 'bzUser',
        function($scope, pagesFactory, $routeParams, bzUser, $sce) {

            $scope.loading = true;

            pagesFactory.get({id: $routeParams.id}, function (data) {
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

                if(data.type === 'url'){

                }
                $scope.data = data;
                $scope.images = data.images;
                $scope.iframe = '<iframe src="'+data.url+'" width="100%" height="300" align="top"></iframe>';
                $scope.loading = false;
            });

            $scope.canEdit = bzUser.has(["pages.can_manage_pages"]);

        }]);
});