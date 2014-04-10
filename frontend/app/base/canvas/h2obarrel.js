define([
    'angular',
    'app',
    'base/canvas/figure'
], function (angular, app) {
    'use strict';

    function H2OBarrel() {
        this.draws = [];

        this.color = '#D9D4D3';
        this.topLevelColor = '#D9D4D3';
//        this.topLevelColor = 'red';

        var self = this;

        this.draws.push(function(ctx) {//bar h2o
            this.ctx.strokeStyle = this.color;

            this.ctx.beginPath();
            this.ctx.moveTo(65,102);
            this.ctx.bezierCurveTo(65,49,175,49,175,102);
            this.ctx.lineTo(175,252);
            this.ctx.bezierCurveTo(175,306,65,306,65,252);
            this.ctx.closePath();
            this.ctx.stroke();

            //this.ctx.strokeStyle = "red";
            this.ctx.beginPath();
            this.ctx.moveTo(65,102);
            this.ctx.bezierCurveTo(65,142,175,142,175,102);
            //this.ctx.closePath();
            this.ctx.stroke();

            //this.ctx.strokeStyle = "green";
            this.ctx.beginPath();
            this.ctx.moveTo(65,222);
            this.ctx.bezierCurveTo(65,262,175,262,175,222);
            this.ctx.moveTo(65,227);
            this.ctx.bezierCurveTo(65,267,175,267,175,227);
            //this.ctx.closePath();

            //this.ctx.stroke();
            //this.ctx.restore();
        });
        this.draws.push(function(ctx) {//bar h2o
            this.ctx.strokeStyle = self.topLevelColor;
            //this.ctx.strokeStyle = '#D9D4D3';

            this.ctx.beginPath();
            this.ctx.moveTo(65,122);
            this.ctx.bezierCurveTo(65,162,175,162,175,122);
            this.ctx.moveTo(65,127);
            this.ctx.bezierCurveTo(65,167,175,167,175,127);
            this.ctx.stroke();
        });

        this.clear = function(ctx) {
            this.ctx.clearRect(63, 61, 114, 302);

//            this.ctx.rect(63, 61, 114, 302);
//            this.ctx.fill();
//            this.ctx.stroke();
        }

        this.drawAlarm = function(type) {
//            console.log(type);
            this.topLevelColor = this.color;

            if(angular.isDefined(type) && type == 'low') {
                this.topLevelColor = this.getColorDefault();
            }

//            if(angular.isDefined(type) && type == 'hight') {
//
//            }

            this.draw();
        }
        this.onDrawStop = function(ctx) {
            $('.t1').css({
                left: Math.ceil(92*self.getScale())+'px',
                top: Math.ceil(170*self.getScale())+'px',
                color: self.color,
                'font-size': Math.ceil(26*self.getScale())+'px'
            });
        }
    }

    H2OBarrel.prototype = new app.Figure();

    app.H2OBarrel = H2OBarrel;
});