define([
    'angular',
    'app',
    'figure'
], function (angular, app) {
    'use strict';

    function pHBarrel() {
        this.draws = [];
        var self = this;

        this.draws.push(function(ctx) {
            ctx.fillStyle = "transparent";
            ctx.strokeStyle = "#D9D4D3";
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
            ctx.fillStyle = "rgba(0, 0, 0, 0)";
            ctx.strokeStyle = "#D9D4D3";
            ctx.lineWidth = self.getLineWidth();
            ctx.miterLimit = 10;
            ctx.beginPath();
            ctx.moveTo(273,207);
            ctx.bezierCurveTo(273,229,329,229,329,207);
        });

        this.draws.push(function(ctx) {
            ctx.fillStyle = "rgba(0, 0, 0, 0)";
            ctx.strokeStyle = "#D9D4D3";
            ctx.lineWidth = self.getLineWidth();
            ctx.miterLimit = 10;
            ctx.beginPath();
            ctx.moveTo(273,257);
            ctx.bezierCurveTo(273,279,329,279,329,257);
        });

        this.draws.push(function(ctx) {
            ctx.fillStyle = "rgba(0, 0, 0, 0)";
            ctx.strokeStyle = "#D9D4D3";
            ctx.lineWidth = self.getLineWidth();
            ctx.miterLimit = 10;
            ctx.beginPath();
            ctx.moveTo(273,262);
            ctx.bezierCurveTo(273,284,329,284,329,262);
        });

        this.onDrawStop = function() {
            $('.t2').css({
                left: Math.ceil(284*self.getScale())+'px',
                top: Math.ceil(225*self.getScale())+'px',
                'font-size': Math.ceil(24*self.getScale())+'px'
            });
        }
    }

    pHBarrel.prototype = new app.Figure();

    app.pHBarrel = pHBarrel;
});