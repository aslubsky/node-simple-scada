define([
    'app',
    'base/canvas/figure'
], function (app) {
    'use strict';

    function Other() {
        this.draws = [];
        var self = this;

        /* pH */
        this.draws.push(function(ctx) {
            ctx.fillStyle = "transparent";
            ctx.strokeStyle = "#D9D4D3";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(300,131.75);
            ctx.bezierCurveTo(310.6314814342428,131.75,319.25,140.36851856575723,319.25,151);
            ctx.bezierCurveTo(319.25,161.63148143424277,310.6314814342428,170.25,300,170.25);
            ctx.bezierCurveTo(289.3685185657572,170.25,280.75,161.63148143424277,280.75,151);
            ctx.bezierCurveTo(280.75,140.36851856575723,289.3685185657572,131.75,300,131.75);
            ctx.closePath();
        });
        this.draws.push(function(ctx) {
            ctx.fillStyle = "rgba(0, 0, 0, 0)";
            ctx.strokeStyle = "#D9D4D3";
            ctx.lineWidth = 2;
            ctx.miterLimit = 10;
            ctx.beginPath();
            ctx.moveTo(300,132);
            ctx.lineTo(320,151);
            ctx.lineTo(300,170);
        });
        this.draws.push(function(ctx) {
            ctx.fillStyle = "rgba(0, 0, 0, 0)";
            ctx.strokeStyle = "#D9D4D3";
            ctx.lineWidth = 2;
            ctx.miterLimit = 10;
            ctx.beginPath();
            ctx.moveTo(301,185);
            ctx.lineTo(301,180);
            ctx.quadraticCurveTo(301,175,300,176);
            ctx.lineTo(300,177);
        });
        this.draws.push(function(ctx) {
            ctx.fillStyle = "#D9D4D3";
            ctx.strokeStyle = "#D9D4D3";
            ctx.lineWidth = 2;
            ctx.miterLimit = 10;
            ctx.beginPath();
            ctx.moveTo(300,171);
            ctx.lineTo(304,178);
            ctx.lineTo(300,177);
            ctx.lineTo(297,178);
            ctx.closePath();
        });
        this.draws.push(function(ctx) {
            ctx.fillStyle = "rgba(0, 0, 0, 0)";
            ctx.strokeStyle = "#D9D4D3";
            ctx.lineWidth = 2;
            ctx.miterLimit = 10;
            ctx.beginPath();
            ctx.moveTo(301,132);
            ctx.lineTo(301,126);
            ctx.quadraticCurveTo(301,120,311,120);
            ctx.lineTo(434,120);
            ctx.quadraticCurveTo(444,120,444,110);
            ctx.lineTo(444,97);
        });
        this.draws.push(function(ctx) {
            ctx.fillStyle = "#D9D4D3";
            ctx.strokeStyle = "#D9D4D3";
            ctx.lineWidth = 2;
            ctx.miterLimit = 10;
            ctx.beginPath();
            ctx.moveTo(444,91);
            ctx.lineTo(447,98);
            ctx.lineTo(444,97);
            ctx.lineTo(440,98);
            ctx.closePath();
        });
        /* pH */


        /* Temp */
        this.draws.push(function(ctx) {
            ctx.fillStyle = "transparent";
            ctx.strokeStyle = "#D9D4D3";
            ctx.lineWidth = 2;
            ctx.miterLimit = 10;
            ctx.beginPath();
            ctx.moveTo(277,9);
            ctx.lineTo(386,9);
            ctx.lineTo(400,40);
            ctx.lineTo(413,40);
            ctx.lineTo(413,70);
            ctx.lineTo(400,70);
            ctx.lineTo(386,100);
            ctx.lineTo(277,100);
            ctx.closePath();
        });
        this.draws.push(function(ctx) {
            ctx.fillStyle = "rgba(0, 0, 0, 0)";
            ctx.strokeStyle = "#D9D4D3";
            ctx.lineWidth = 2;
            ctx.miterLimit = 10;
            ctx.beginPath();
            ctx.moveTo(263,55);
            ctx.lineTo(400,55);
            ctx.lineTo(386,85);
            ctx.lineTo(359,24);
            ctx.lineTo(332,85);
            ctx.lineTo(304,24);
            ctx.lineTo(291,55);
        });

        this.draws.push(function(ctx) {
            ctx.fillStyle = "transparent";
            ctx.strokeStyle = "#D9D4D3";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(209,28.562499999999996);
            ctx.bezierCurveTo(223.6010280736516,28.562499999999996,235.4375,40.398971926348395,235.4375,55);
            ctx.bezierCurveTo(235.4375,69.6010280736516,223.6010280736516,81.4375,209,81.4375);
            ctx.bezierCurveTo(194.3989719263484,81.4375,182.5625,69.6010280736516,182.5625,55);
            ctx.bezierCurveTo(182.5625,40.398971926348395,194.3989719263484,28.562499999999996,209,28.562499999999996);
            ctx.closePath();
        });
        this.draws.push(function(ctx) {
            ctx.fillStyle = "rgba(0, 0, 0, 0)";
            ctx.strokeStyle = "#D9D4D3";
            ctx.lineWidth = 2;
            ctx.miterLimit = 10;
            ctx.beginPath();
            ctx.moveTo(209,28);
            ctx.lineTo(236,55);
            ctx.lineTo(209,81);
        });
        /* Temp */



        /*Cl*/
        this.draws.push(function(ctx) {
            ctx.fillStyle = "transparent";
            ctx.strokeStyle = "#D9D4D3";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(395,131.75);
            ctx.bezierCurveTo(405.6314814342428,131.75,414.25,140.36851856575723,414.25,151);
            ctx.bezierCurveTo(414.25,161.63148143424277,405.6314814342428,170.25,395,170.25);
            ctx.bezierCurveTo(384.3685185657572,170.25,375.75,161.63148143424277,375.75,151);
            ctx.bezierCurveTo(375.75,140.36851856575723,384.3685185657572,131.75,395,131.75);
            ctx.closePath();
        });
        this.draws.push(function(ctx) {
            ctx.fillStyle = "rgba(0, 0, 0, 0)";
            ctx.strokeStyle = "#D9D4D3";
            ctx.lineWidth = 2;
            ctx.miterLimit = 10;
            ctx.beginPath();
            ctx.moveTo(395,132);
            ctx.lineTo(415,151);
            ctx.lineTo(395,171);
        });
        this.draws.push(function(ctx) {
            ctx.fillStyle = "rgba(0, 0, 0, 0)";
            ctx.strokeStyle = "#D9D4D3";
            ctx.lineWidth = 2;
            ctx.miterLimit = 10;
            ctx.beginPath();
            ctx.moveTo(396,185);
            ctx.lineTo(396,180);
            ctx.quadraticCurveTo(396,175,395,176);
            ctx.lineTo(395,177);
        });
        this.draws.push(function(ctx) {
            ctx.fillStyle = "#D9D4D3";
            ctx.strokeStyle = "#D9D4D3";
            ctx.lineWidth = 2;
            ctx.miterLimit = 10;
            ctx.beginPath();
            ctx.moveTo(395,172);
            ctx.lineTo(399,179);
            ctx.lineTo(395,177);
            ctx.lineTo(392,179);
            ctx.closePath();
        });
        this.draws.push(function(ctx) {
            ctx.fillStyle = "rgba(0, 0, 0, 0)";
            ctx.strokeStyle = "#D9D4D3";
            ctx.lineWidth = 2;
            ctx.miterLimit = 10;
            ctx.beginPath();
            ctx.moveTo(395,132);
            ctx.lineTo(395,126);
            ctx.quadraticCurveTo(395,120,405,120);
            ctx.lineTo(434,120);
            ctx.quadraticCurveTo(444,120,444,110);
            ctx.lineTo(444,97);
        });
        /*Cl*/
    }

    Other.prototype = new app.Figure();

    app.Other = Other;
});