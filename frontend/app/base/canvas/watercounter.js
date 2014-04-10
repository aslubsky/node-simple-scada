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


        this.clear = function () {
            //this.ctx.moveTo(0, 0);
            this.ctx.clearRect(this.x, this.y, this.width, this.height);
//            this.ctx.rect(this.x, this.y, this.width, this.height);
//            this.ctx.fill();
//            this.ctx.stroke();
        }

        this.inFigure = function (mouse) {
            var s = this.getScale();
            if (this.x*s < mouse.x &&
                this.x*s + this.width*s > mouse.x &&
                this.y*s < mouse.y &&
                this.y*s + this.height*s > mouse.y) {
                return true;
            }
            return false;
        }
        this.onSelect = function (e) {
            var mouse = self.getPosition(e);
            //console.log(e, mouse, self.inFigure(mouse));
            if(self.inFigure(mouse)) {
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
            $('.t4').css({
                left: Math.ceil(47*self.getScale())+'px',
                top: Math.ceil(2*self.getScale())+'px',
                'font-size': Math.ceil(26*self.getScale())+'px'
            }).on('click', this.onSelect);
        }
    }

    WaterCounter.prototype = new app.Figure();

    app.WaterCounter = WaterCounter;
});