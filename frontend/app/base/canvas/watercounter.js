define([
    'app',
    'base/canvas/figure'
], function (app) {
    'use strict';

    function WaterCounter() {
        this.draws = [];
        var self = this;
//        this.$scope = null;
        this.color = '#D9D4D3';
        this.x = 35;
        this.y = 0;
        this.width = 47;
        this.height = 47;

        this.draws.push(function () {
            this.ctx.beginPath();
            this.ctx.moveTo(58, 0.75);
            this.ctx.bezierCurveTo(70.28833568373516, 0.75, 80.25, 10.711664316264843, 80.25, 23);
            this.ctx.bezierCurveTo(80.25, 35.288335683735156, 70.28833568373516, 45.25, 58, 45.25);
            this.ctx.bezierCurveTo(45.711664316264844, 45.25, 35.75, 35.288335683735156, 35.75, 23);
            this.ctx.bezierCurveTo(35.75, 10.711664316264843, 45.711664316264844, 0.75, 58, 0.75);
            this.ctx.closePath();
        });

        this.draws.push(function () {
            this.ctx.beginPath();
            this.ctx.moveTo(58, 4.75);
            this.ctx.bezierCurveTo(68.07919668441198, 4.75, 76.25, 12.920803315588017, 76.25, 23);
            this.ctx.bezierCurveTo(76.25, 33.07919668441198, 68.07919668441198, 41.25, 58, 41.25);
            this.ctx.bezierCurveTo(47.92080331558802, 41.25, 39.75, 33.07919668441198, 39.75, 23);
            this.ctx.bezierCurveTo(39.75, 12.920803315588017, 47.92080331558802, 4.75, 58, 4.75);
            this.ctx.closePath();
        });


        this.draws.push(function () {//cog
            this.ctx.save();

            this.ctx.translate(42, 7);

            this.ctx.beginPath();
            this.ctx.moveTo(31.229,17.736);
            this.ctx.bezierCurveTo(31.293,17.165,31.333,16.588,31.333,16);
            this.ctx.bezierCurveTo(31.333,15.411999999999999,31.293,14.834,31.229,14.263);
            this.ctx.lineTo(26.852,12.706);
            this.ctx.bezierCurveTo(26.634,11.99,26.348,11.305,26.001,10.655999999999999);
            this.ctx.lineTo(27.994,6.463999999999999);
            this.ctx.bezierCurveTo(27.269,5.5539999999999985,26.445,4.729999999999999,25.536,4.004999999999999);
            this.ctx.lineTo(21.343000000000004,5.998999999999999);
            this.ctx.bezierCurveTo(20.696000000000005,5.651999999999999,20.009000000000004,5.366999999999999,19.294000000000004,5.149999999999999);
            this.ctx.lineTo(17.736000000000004,0.7719999999999985);
            this.ctx.bezierCurveTo(17.165,0.708,16.588,0.667,16,0.667);
            this.ctx.bezierCurveTo(15.411999999999999,0.667,14.834,0.7080000000000001,14.263,0.772);
            this.ctx.lineTo(12.707,5.15);
            this.ctx.bezierCurveTo(11.991000000000001,5.367,11.306000000000001,5.652,10.657,5.9990000000000006);
            this.ctx.lineTo(6.464,4.005);
            this.ctx.bezierCurveTo(5.554,4.73,4.73,5.554,4.005,6.464);
            this.ctx.lineTo(5.999,10.656);
            this.ctx.bezierCurveTo(5.651999999999999,11.304,5.367,11.99,5.1499999999999995,12.706);
            this.ctx.lineTo(0.7719999999999994,14.263);
            this.ctx.bezierCurveTo(0.708,14.834,0.667,15.412,0.667,16);
            this.ctx.bezierCurveTo(0.667,16.588,0.7080000000000001,17.165,0.772,17.736);
            this.ctx.lineTo(5.15,19.294);
            this.ctx.bezierCurveTo(5.367,20.009,5.652,20.695,5.9990000000000006,21.343);
            this.ctx.lineTo(4.005000000000001,25.536);
            this.ctx.bezierCurveTo(4.73,26.445,5.554,27.269000000000002,6.464,27.994);
            this.ctx.lineTo(10.656,26.001);
            this.ctx.bezierCurveTo(11.304,26.348000000000003,11.99,26.634,12.706,26.852);
            this.ctx.lineTo(14.263,31.229);
            this.ctx.bezierCurveTo(14.834,31.293,15.411,31.333,16,31.333);
            this.ctx.bezierCurveTo(16.588,31.333,17.165,31.293,17.736,31.229);
            this.ctx.lineTo(19.294,26.852);
            this.ctx.bezierCurveTo(20.009,26.634,20.693,26.348,21.343,26.001);
            this.ctx.lineTo(25.536,27.994);
            this.ctx.bezierCurveTo(26.445,27.269,27.269000000000002,26.445,27.994,25.536);
            this.ctx.lineTo(26.001,21.343000000000004);
            this.ctx.bezierCurveTo(26.348000000000003,20.696000000000005,26.634,20.009000000000004,26.852,19.294000000000004);
            this.ctx.lineTo(31.229,17.736);
            this.ctx.closePath();
            this.ctx.moveTo(16,20.871);
            this.ctx.bezierCurveTo(13.31,20.871,11.128,18.689,11.128,15.999999999999998);
            this.ctx.bezierCurveTo(11.128,13.309999999999999,13.31,11.127999999999998,16,11.127999999999998);
            this.ctx.bezierCurveTo(18.689,11.127999999999998,20.871000000000002,13.309999999999999,20.871000000000002,15.999999999999998);
            this.ctx.bezierCurveTo(20.871,18.689,18.689,20.871,16,20.871);
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.stroke();
            
            this.ctx.restore();
        });


        this.clear = function () {
            //this.ctx.moveTo(0, 0);
            this.ctx.clearRect(this.x, this.y, this.width, this.height);
//            this.ctx.rect(this.x, this.y, this.width, this.height);
//            this.ctx.fill();
//            this.ctx.stroke();
        }

        this.inFigure = function (mouse) {
            var s = this.getScale();
            if (this.x * s < mouse.x &&
                this.x * s + this.width * s > mouse.x &&
                this.y * s < mouse.y &&
                this.y * s + this.height * s > mouse.y) {
                return true;
            }
            return false;
        }
        this.onSelect = function (e) {
            var mouse = self.getPosition(e);
            //console.log(e, mouse, self.inFigure(mouse));
            if (self.inFigure(mouse)) {
                //console.log('OK');
//                console.log(self.$scope);
                self.$scope.hideDialog = false;
                self.$scope.dialogMessage = 'Перекачано (м.к.): 12.5';
                self.$scope.$apply();
            }
        }

        this.onDrawStop = function () {
            /*$('.t4').css({
             left: Math.ceil(45*self.getScale())+'px',
             top: Math.ceil(2*self.getScale())+'px',
             'font-size': Math.ceil(26*self.getScale())+'px'
             });*/
//            $('.t4').css({
//                left: Math.ceil(47*self.getScale())+'px',
//                top: Math.ceil(2*self.getScale())+'px',
//                'font-size': Math.ceil(26*self.getScale())+'px'
//            }).on('click', this.onSelect);
        }
    }

    WaterCounter.prototype = new app.Figure();

    app.WaterCounter = WaterCounter;
});