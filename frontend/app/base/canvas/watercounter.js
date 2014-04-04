define([
    'angular',
    'app',
    'figure'
], function (angular, app) {
    'use strict';

    function WaterCounter() {
        this.draws = [];
        var self = this;

        this.draws.push(function(ctx) {
            ctx.fillStyle = "transparent";
            ctx.strokeStyle = "#D9D4D3";
            ctx.lineWidth = self.getLineWidth();
            ctx.beginPath();
            ctx.moveTo(58,0.75);
            ctx.bezierCurveTo(70.28833568373516,0.75,80.25,10.711664316264843,80.25,23);
            ctx.bezierCurveTo(80.25,35.288335683735156,70.28833568373516,45.25,58,45.25);
            ctx.bezierCurveTo(45.711664316264844,45.25,35.75,35.288335683735156,35.75,23);
            ctx.bezierCurveTo(35.75,10.711664316264843,45.711664316264844,0.75,58,0.75);
            ctx.closePath();
        });

        this.draws.push(function(ctx) {
            ctx.fillStyle = "rgba(0, 0, 0, 0)";
            ctx.strokeStyle = "#D9D4D3";
            ctx.lineWidth = self.getLineWidth();
            ctx.beginPath();
            ctx.moveTo(58,4.75);
            ctx.bezierCurveTo(68.07919668441198,4.75,76.25,12.920803315588017,76.25,23);
            ctx.bezierCurveTo(76.25,33.07919668441198,68.07919668441198,41.25,58,41.25);
            ctx.bezierCurveTo(47.92080331558802,41.25,39.75,33.07919668441198,39.75,23);
            ctx.bezierCurveTo(39.75,12.920803315588017,47.92080331558802,4.75,58,4.75);
            ctx.closePath();
        });


        this.onDrawStop = function(ctx) {
            /*$('.t4').css({
             left: Math.ceil(45*self.getScale())+'px',
             top: Math.ceil(2*self.getScale())+'px',
             'font-size': Math.ceil(26*self.getScale())+'px'
             });*/
            $('.t4').css({
                left: Math.ceil(47*self.getScale())+'px',
                top: Math.ceil(2*self.getScale())+'px',
                'font-size': Math.ceil(26*self.getScale())+'px'
            });
        }
    }

    WaterCounter.prototype = new app.Figure();

    app.WaterCounter = WaterCounter;
});