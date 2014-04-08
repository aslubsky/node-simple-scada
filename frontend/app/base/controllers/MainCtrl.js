define(['app'], function(app) {
    app.controller('Dashboard.MainCtrl', ['$scope', '$location', '$routeParams',
        function($scope, $location, $routeParams) {


            var self = this;
            this.objects = {};
            var canvas = this.canvas = document.getElementById('c');
            //console.log(canvas);

            this.objects.arrows = new app.Arrows();
            this.objects.h2o = new app.H2OBarrel();
            this.objects.ph = new app.pHBarrel();
            this.objects.cl = new app.ClBarrel();
            this.objects.watercounter = new app.WaterCounter();
            this.objects.other = new app.Other();




            angular.forEach(this.objects, function(o) {
                o.setCanvas(canvas);
            });

            this.init = function() {
                var scale = this.objects.h2o.getScale();
                //console.log(s);
                this.canvas.width = Math.ceil(this.objects.h2o.getOrigWidth()*scale);
                this.canvas.height = Math.ceil(this.objects.h2o.getOrigHeight()*scale);


                $('#cc').css({
                    width: this.canvas.width+'px',
                    height: this.canvas.height+'px'
                });
            }

            this.draw = function() {
                angular.forEach(this.objects, function(o, k) {
//                    console.log(k, '===');
                    o.draw();
                });
            }
            this.clear = function() {
                this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
            }

            this.init();
            this.draw();

            //this.objects.h2o.startAlarm('low');
//            this.objects.h2o.startAlarm();
            this.objects.ph.startAlarm();
            this.objects.cl.startAlarm();
//            this.objects.h2o.startAlarm();

            $(window).resize(function(){
                self.init();
                self.clear();
                self.draw();
            });
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