define([
    'angular',
    'app',
    'figure'
], function (angular, app) {
    'use strict';

    function Arrows() {
        this.draws = [];

        var self = this;

        this.draws.push(function(ctx) {

            ctx.fillStyle = "#D9D4D3";
            ctx.strokeStyle = "#D9D4D3";
            ctx.lineWidth = 2;
            ctx.miterLimit = 10;
            ctx.translate(109,39);
            ctx.rotate(1.5707963267948966);
            ctx.translate(-109,-39);
            ctx.beginPath();
            ctx.moveTo(101,64);
            ctx.lineTo(101,38);
            ctx.bezierCurveTo(101,38,101,37,101,37);
            ctx.bezierCurveTo(102,36,102,36,103,36);
            ctx.lineTo(113,36);
            ctx.lineTo(113,43);
            ctx.lineTo(129,28);
            ctx.lineTo(113,13);
            ctx.lineTo(113,20);
            ctx.lineTo(103,20);
            ctx.bezierCurveTo(95,20,88,28,88,38);
            ctx.lineTo(88,64);
            ctx.closePath();




        });


        this.draws.push(function(ctx) {

            ctx.fillStyle = "#D9D4D3";
            ctx.strokeStyle = "#D9D4D3";
            ctx.lineWidth = 2;
            ctx.miterLimit = 10;
            ctx.translate(200,129);
            ctx.rotate(1.5707963267948966);
            ctx.translate(-200,-129);
            ctx.beginPath();
            ctx.moveTo(217,154);
            ctx.lineTo(217,129);
            ctx.bezierCurveTo(217,127,215,126,213,126);
            ctx.lineTo(190,126);
            ctx.lineTo(190,133);
            ctx.lineTo(155,118);
            ctx.lineTo(190,104);
            ctx.lineTo(190,111);
            ctx.lineTo(213,111);
            ctx.bezierCurveTo(230,111,244,119,244,129);
            ctx.lineTo(244,154);
            ctx.closePath();



        });
        this.draws.push(function(ctx) {

            ctx.fillStyle = "#D9D4D3";
            ctx.strokeStyle = "#D9D4D3";
            ctx.lineWidth = 2;
            ctx.miterLimit = 10;
            ctx.beginPath();
            ctx.moveTo(2,19);
            ctx.lineTo(20,19);
            ctx.lineTo(20,10);
            ctx.lineTo(32,25);
            ctx.lineTo(20,40);
            ctx.lineTo(20,32);
            ctx.lineTo(2,32);
            ctx.closePath();



        });
        this.draws.push(function(ctx) {
            ctx.fillStyle = "#D9D4D3";
            ctx.strokeStyle = "#D9D4D3";
            ctx.lineWidth = 2;
            ctx.miterLimit = 10;
            ctx.beginPath();
            ctx.moveTo(2,107);
            ctx.lineTo(38,107);
            ctx.lineTo(38,87);
            ctx.lineTo(62,122);
            ctx.lineTo(38,157);
            ctx.lineTo(38,137);
            ctx.lineTo(2,137);
            ctx.closePath();
        });

        this.draws.push(function(ctx) {
            ctx.fillStyle = "#D9D4D3";
            ctx.strokeStyle = "#D9D4D3";
            ctx.lineWidth = 2;
            ctx.miterLimit = 10;
            ctx.beginPath();
            ctx.moveTo(413,40);
            ctx.lineTo(451,40);
            ctx.lineTo(451,20);
            ctx.lineTo(476,55);
            ctx.lineTo(451,90);
            ctx.lineTo(451,70);
            ctx.lineTo(413,70);
            ctx.closePath();
        });
        this.draws.push(function(ctx) {
            ctx.fillStyle = "#D9D4D3";
            ctx.strokeStyle = "#D9D4D3";
            ctx.lineWidth = 2;
            ctx.miterLimit = 10;
            ctx.beginPath();
            ctx.moveTo(241,39);
            ctx.lineTo(260,39);
            ctx.lineTo(260,19);
            ctx.lineTo(273,54);
            ctx.lineTo(260,89);
            ctx.lineTo(260,69);
            ctx.lineTo(241,69);
            ctx.closePath();
        });
    }

    Arrows.prototype = new app.Figure();

    app.Arrows = Arrows;
});