define(['app'], function(app) {
    app.controller('Dashboard.MainCtrl', ['$scope', '$location', '$routeParams',
        function($scope, $location, $routeParams) {


            this.objects = {};
            var canvas = this.canvas = document.getElementById('c');
            //console.log(canvas);

            this.objects.arrows = new app.Arrows();
            this.objects.h2o = new app.H2OBarrel();
            /*this.objects.wc = new WaterCounter();
            this.objects.mainBar = new MainBar();
            this.objects.pHb = new pHBarrel();
            this.objects.clb = new ClBarrel();
            this.objects.other = new Other();*/


            this.objects.arrows.setCanvas(canvas);
//    _.forEach(this.objects, function(o) {
//        o.setCanvas(canvas);
//    });

            this.init = function() {
                var scale = this.objects.arrows.getScale();
                //console.log(s);
                this.canvas.width = Math.ceil(this.objects.arrows.getOrigWidth()*scale);
                this.canvas.height = Math.ceil(this.objects.arrows.getOrigHeight()*scale);


                $('#cc').css({
                    width: this.canvas.width+'px',
                    height: this.canvas.height+'px'
                });
            }

            this.draw = function() {
                console.log(this.objects.arrows);
                this.objects.arrows.draw();
//        _.forEach(this.objects, function(o) {
//            o.draw();
//        });
            }
            this.clear = function() {
                this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
            }
            this.init();
            this.draw();

            //console.log('Dashboard.MainCtrl');

            //$scope.m = new Main(document.getElementById('c'));
            //$scope.m.draw();

            /*$(window).resize(function(){
                $.m.init();
                $.m.clear();
                $.m.draw();
            });*/
        }]);
});