define([
    'angular',
    'app',
    'figure'
], function (angular, app) {
    'use strict';

    function H2OBarrel() {
        this.draws = [];

        this.color = '#D9D4D3';

        var self = this;

        this.draws.push(function(ctx) {//bar h2o
            ctx.fillStyle = "transparent";
            ctx.strokeStyle = self.color;
            ctx.lineWidth = self.getLineWidth();
            ctx.miterLimit = 10;
            ctx.beginPath();
            ctx.moveTo(65,102);
            ctx.bezierCurveTo(65,49,175,49,175,102);
            ctx.lineTo(175,252);
            ctx.bezierCurveTo(175,306,65,306,65,252);
            ctx.closePath();
        });
        this.draws.push(function(ctx) {//bar h2o
            ctx.fillStyle = "transparent";
            ctx.strokeStyle = self.color;
            ctx.lineWidth = self.getLineWidth();
            ctx.miterLimit = 10;
            ctx.beginPath();
            ctx.moveTo(65,102);
            ctx.bezierCurveTo(65,142,175,142,175,102);

            ctx.moveTo(65,122);
            ctx.bezierCurveTo(65,162,175,162,175,122);
            ctx.moveTo(65,127);
            ctx.bezierCurveTo(65,167,175,167,175,127);

            ctx.moveTo(65,222);
            ctx.bezierCurveTo(65,262,175,262,175,222);
            ctx.moveTo(65,227);
            ctx.bezierCurveTo(65,267,175,267,175,227);
        });
        this.clear = function(ctx) {
            var s = this.getScale();
            this.ctx.save();
            this.ctx.scale(s, s);
            this.ctx.clearRect(63, 61, 114, 302);
            this.ctx.restore();
        }
        this.onDrawStart = function(ctx) {
            this.clear();
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