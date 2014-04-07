define([
    'app',
    'base/canvas/figure'
], function (app) {
    'use strict';

    function pHBarrel() {
        this.draws = [];
        this.color = '#D9D4D3';
        var self = this;

        this.draws.push(function(ctx) {
            ctx.fillStyle = "transparent";
            ctx.strokeStyle = self.color;
            ctx.lineWidth = self.getLineWidth();
            ctx.miterLimit = 10;
            ctx.beginPath();
            ctx.moveTo(273,207);
            ctx.bezierCurveTo(273,177,329,177,329,207);
            ctx.lineTo(329,270);
            ctx.bezierCurveTo(329,300,273,300,273,270);
            ctx.closePath();
        });

        this.draws.push(function(ctx) {
            ctx.fillStyle = "transparent";
            ctx.strokeStyle = self.color;
            ctx.lineWidth = self.getLineWidth();
            ctx.miterLimit = 10;
            ctx.beginPath();
            ctx.moveTo(273,207);
            ctx.bezierCurveTo(273,229,329,229,329,207);
        });

        this.draws.push(function(ctx) {
            ctx.fillStyle = "transparent";
            ctx.strokeStyle = self.color;
            ctx.lineWidth = self.getLineWidth();
            ctx.miterLimit = 10;
            ctx.beginPath();
            ctx.moveTo(273,257);
            ctx.bezierCurveTo(273,279,329,279,329,257);
        });

        this.draws.push(function(ctx) {
            ctx.fillStyle = "transparent";
            ctx.strokeStyle = self.color;
            ctx.lineWidth = self.getLineWidth();
            ctx.miterLimit = 10;
            ctx.beginPath();
            ctx.moveTo(273,262);
            ctx.bezierCurveTo(273,284,329,284,329,262);
        });

        this.clear = function(ctx) {
            var s = this.getScale();
            this.ctx.save();
            this.ctx.scale(s, s);
            this.ctx.clearRect(273, 183, 57, 111);
            this.ctx.restore();
        }
        this.onDrawStart = function(ctx) {
            this.clear();
        }
        this.onDrawStop = function() {
            $('.t2').css({
                left: Math.ceil(284*self.getScale())+'px',
                top: Math.ceil(225*self.getScale())+'px',
                color: self.color,
                'font-size': Math.ceil(24*self.getScale())+'px'
            });
        }
    }

    pHBarrel.prototype = new app.Figure();

    app.pHBarrel = pHBarrel;
});