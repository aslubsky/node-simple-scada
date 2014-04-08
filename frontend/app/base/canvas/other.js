define([
    'app',
    'base/canvas/figure'
], function (app) {
    'use strict';

    function Other() {
        this.draws = [];
        var self = this;
        this.color = '#D9D4D3';

        /* pH */
        this.draws.push(function() {
            this.ctx.beginPath();
            this.ctx.moveTo(300,131.75);
            this.ctx.bezierCurveTo(310.6314814342428,131.75,319.25,140.36851856575723,319.25,151);
            this.ctx.bezierCurveTo(319.25,161.63148143424277,310.6314814342428,170.25,300,170.25);
            this.ctx.bezierCurveTo(289.3685185657572,170.25,280.75,161.63148143424277,280.75,151);
            this.ctx.bezierCurveTo(280.75,140.36851856575723,289.3685185657572,131.75,300,131.75);
            this.ctx.closePath();
        });
        this.draws.push(function() {
            this.ctx.beginPath();
            this.ctx.moveTo(300,132);
            this.ctx.lineTo(320,151);
            this.ctx.lineTo(300,170);
        });
        this.draws.push(function() {
            this.ctx.beginPath();
            this.ctx.moveTo(301,185);
            this.ctx.lineTo(301,180);
            this.ctx.quadraticCurveTo(301,175,300,176);
            this.ctx.lineTo(300,177);
        });
        this.draws.push(function() {
            this.ctx.fillStyle = this.color;
            this.ctx.beginPath();
            this.ctx.moveTo(300,171);
            this.ctx.lineTo(304,178);
            this.ctx.lineTo(300,177);
            this.ctx.lineTo(297,178);
            this.ctx.closePath();
            this.ctx.fill();
        });
        this.draws.push(function() {
            this.ctx.beginPath();
            this.ctx.moveTo(301,132);
            this.ctx.lineTo(301,126);
            this.ctx.quadraticCurveTo(301,120,311,120);
            this.ctx.lineTo(434,120);
            this.ctx.quadraticCurveTo(444,120,444,110);
            this.ctx.lineTo(444,97);
        });
        this.draws.push(function() {
            this.ctx.fillStyle = this.color;
            this.ctx.beginPath();
            this.ctx.moveTo(444,91);
            this.ctx.lineTo(447,98);
            this.ctx.lineTo(444,97);
            this.ctx.lineTo(440,98);
            this.ctx.closePath();
            this.ctx.fill();
        });
        /* pH */


        /* Temp */
        this.draws.push(function() {
            this.ctx.beginPath();
            this.ctx.moveTo(277,9);
            this.ctx.lineTo(386,9);
            this.ctx.lineTo(400,40);
            this.ctx.lineTo(413,40);
            this.ctx.lineTo(413,70);
            this.ctx.lineTo(400,70);
            this.ctx.lineTo(386,100);
            this.ctx.lineTo(277,100);
            this.ctx.closePath();
        });
        this.draws.push(function() {
            this.ctx.beginPath();
            this.ctx.moveTo(263,55);
            this.ctx.lineTo(400,55);
            this.ctx.lineTo(386,85);
            this.ctx.lineTo(359,24);
            this.ctx.lineTo(332,85);
            this.ctx.lineTo(304,24);
            this.ctx.lineTo(291,55);
        });

        this.draws.push(function() {
            this.ctx.beginPath();
            this.ctx.moveTo(209,28.562499999999996);
            this.ctx.bezierCurveTo(223.6010280736516,28.562499999999996,235.4375,40.398971926348395,235.4375,55);
            this.ctx.bezierCurveTo(235.4375,69.6010280736516,223.6010280736516,81.4375,209,81.4375);
            this.ctx.bezierCurveTo(194.3989719263484,81.4375,182.5625,69.6010280736516,182.5625,55);
            this.ctx.bezierCurveTo(182.5625,40.398971926348395,194.3989719263484,28.562499999999996,209,28.562499999999996);
            this.ctx.closePath();
        });
        this.draws.push(function() {
            this.ctx.beginPath();
            this.ctx.moveTo(209,28);
            this.ctx.lineTo(236,55);
            this.ctx.lineTo(209,81);
        });
        /* Temp */



        /*Cl*/
        this.draws.push(function() {
            this.ctx.beginPath();
            this.ctx.moveTo(395,131.75);
            this.ctx.bezierCurveTo(405.6314814342428,131.75,414.25,140.36851856575723,414.25,151);
            this.ctx.bezierCurveTo(414.25,161.63148143424277,405.6314814342428,170.25,395,170.25);
            this.ctx.bezierCurveTo(384.3685185657572,170.25,375.75,161.63148143424277,375.75,151);
            this.ctx.bezierCurveTo(375.75,140.36851856575723,384.3685185657572,131.75,395,131.75);
            this.ctx.closePath();
        });
        this.draws.push(function() {
            this.ctx.beginPath();
            this.ctx.moveTo(395,132);
            this.ctx.lineTo(415,151);
            this.ctx.lineTo(395,171);
        });
        this.draws.push(function() {
            this.ctx.beginPath();
            this.ctx.moveTo(396,185);
            this.ctx.lineTo(396,180);
            this.ctx.quadraticCurveTo(396,175,395,176);
            this.ctx.lineTo(395,177);
        });
        this.draws.push(function() {
            this.ctx.beginPath();
            this.ctx.moveTo(395,172);
            this.ctx.lineTo(399,179);
            this.ctx.lineTo(395,177);
            this.ctx.lineTo(392,179);
            this.ctx.closePath();
        });
        this.draws.push(function() {
            this.ctx.beginPath();
            this.ctx.moveTo(395,132);
            this.ctx.lineTo(395,126);
            this.ctx.quadraticCurveTo(395,120,405,120);
            this.ctx.lineTo(434,120);
            this.ctx.quadraticCurveTo(444,120,444,110);
            this.ctx.lineTo(444,97);
        });
        /*Cl*/



        this.onDrawStart = function() {
            this.ctx.fillStyle = this.color;
            this.ctx.strokeStyle = this.color;
        }

        this.onDrawStop = function() {
            this.ctx.fillStyle = "transparent";
            this.ctx.strokeStyle = this.color;
        }
    }

    Other.prototype = new app.Figure();

    app.Other = Other;
});