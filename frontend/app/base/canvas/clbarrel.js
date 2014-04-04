define([
    'angular',
    'app',
    'figure'
], function (angular, app) {
    'use strict';

    function ClBarrel() {
        this.draws = [];
        var self = this;


        this.draws.push(function(ctx) {
            ctx.fillStyle = "transparent";
            ctx.strokeStyle = "#D9D4D3";
            ctx.lineWidth = 2;
            ctx.miterLimit = 10;
            ctx.beginPath();
            ctx.moveTo(368,207);
            ctx.bezierCurveTo(368,178,424,178,424,207);
            ctx.lineTo(424,271);
            ctx.bezierCurveTo(424,300,368,300,368,271);
            ctx.closePath();
        });

        this.draws.push(function(ctx) {
            ctx.fillStyle = "rgba(0, 0, 0, 0)";
            ctx.strokeStyle = "#D9D4D3";
            ctx.lineWidth = 2;
            ctx.miterLimit = 10;
            ctx.beginPath();
            ctx.moveTo(368,207);
            ctx.bezierCurveTo(368,229,424,229,424,207);
        });

        this.draws.push(function(ctx) {
            ctx.fillStyle = "rgba(0, 0, 0, 0)";
            ctx.strokeStyle = "#D9D4D3";
            ctx.lineWidth = 2;
            ctx.miterLimit = 10;
            ctx.beginPath();
            ctx.moveTo(368,257);
            ctx.bezierCurveTo(368,279,424,279,424,257);
        });

        this.draws.push(function(ctx) {
            ctx.fillStyle = "rgba(0, 0, 0, 0)";
            ctx.strokeStyle = "#D9D4D3";
            ctx.lineWidth = 2;
            ctx.miterLimit = 10;
            ctx.beginPath();
            ctx.moveTo(368,262);
            ctx.bezierCurveTo(368,284,424,284,424,262);
        });

        this.onDrawStop = function() {
            $('.t3').css({
                left: Math.ceil(384*self.getScale())+'px',
                top: Math.ceil(225*self.getScale())+'px',
                'font-size': Math.ceil(24*self.getScale())+'px'
            });
        }
    }

    ClBarrel.prototype = new app.Figure();

    app.ClBarrel = ClBarrel;
});