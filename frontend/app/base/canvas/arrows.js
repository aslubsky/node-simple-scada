define([
    'app',
    'base/canvas/figure'
], function (app) {
    'use strict';

    function Arrows() {
        this.draws = [];
        this.color = '#D9D4D3';

        var self = this;

        this.draws.push(function() {
            this.ctx.fillStyle = this.color;
            this.ctx.beginPath();
            this.ctx.moveTo(2,19);
            this.ctx.lineTo(20,19);
            this.ctx.lineTo(20,10);
            this.ctx.lineTo(32,25);
            this.ctx.lineTo(20,40);
            this.ctx.lineTo(20,32);
            this.ctx.lineTo(2,32);
            this.ctx.closePath();
            this.ctx.fill();
        });

        this.draws.push(function() {
            this.ctx.fillStyle = this.color;
            this.ctx.beginPath();
            this.ctx.moveTo(2,107);
            this.ctx.lineTo(38,107);
            this.ctx.lineTo(38,87);
            this.ctx.lineTo(61,122);
            this.ctx.lineTo(38,157);
            this.ctx.lineTo(38,137);
            this.ctx.lineTo(2,137);
            this.ctx.closePath();
            this.ctx.fill();
        });

        this.draws.push(function() {
            this.ctx.save();
            this.ctx.fillStyle = this.color;
            this.ctx.translate(109,39);
            this.ctx.rotate(1.5707963267948966);
            this.ctx.translate(-109,-39);
            this.ctx.beginPath();
            this.ctx.moveTo(101,64);
            this.ctx.lineTo(101,38);
            this.ctx.bezierCurveTo(101,38,101,37,101,37);
            this.ctx.bezierCurveTo(102,36,102,36,103,36);
            this.ctx.lineTo(113,36);
            this.ctx.lineTo(113,43);
            this.ctx.lineTo(128,28);
            this.ctx.lineTo(113,13);
            this.ctx.lineTo(113,20);
            this.ctx.lineTo(103,20);
            this.ctx.bezierCurveTo(95,20,88,28,88,38);
            this.ctx.lineTo(88,64);
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.restore();
        });

        this.draws.push(function() {
            this.ctx.save();
            this.ctx.fillStyle = this.color;
            this.ctx.moveTo(178, 174);
            this.ctx.quadraticCurveTo(194,174,194,154);
            this.ctx.lineTo(194, 104);
            this.ctx.lineTo(184, 104);
            this.ctx.lineTo(209, 85);
            this.ctx.lineTo(234, 104);
            this.ctx.lineTo(224, 104);
            this.ctx.lineTo(224, 154);
            this.ctx.quadraticCurveTo(224,204,178,204);
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.restore();
        });

        this.draws.push(function() {
            this.ctx.fillStyle = this.color;
            this.ctx.beginPath();
            this.ctx.moveTo(241,39);
            this.ctx.lineTo(260,39);
            this.ctx.lineTo(260,19);
            this.ctx.lineTo(273,54);
            this.ctx.lineTo(260,89);
            this.ctx.lineTo(260,69);
            this.ctx.lineTo(241,69);
            this.ctx.closePath();
            this.ctx.fill();
        });

        this.draws.push(function() {
            this.ctx.fillStyle = this.color;
            this.ctx.beginPath();
            this.ctx.moveTo(413,39);
            this.ctx.lineTo(451,39);
            this.ctx.lineTo(451,20);
            this.ctx.lineTo(476,55);
            this.ctx.lineTo(451,90);
            this.ctx.lineTo(451,70);
            this.ctx.lineTo(413,70);
            this.ctx.closePath();
            this.ctx.fill();
        });

        this.onDrawStart = function() {
            this.ctx.fillStyle = this.color;
            this.ctx.strokeStyle = "#D9D4D3";
        }

        this.onDrawStop = function() {
            this.ctx.fillStyle = "transparent";
            this.ctx.strokeStyle = "#D9D4D3";
        }

        this.clear = function() {
            //this.ctx.clearRect(178, 85, 70, 302);
        }
   
        // this.onSelect = function (e) {
            // var s = self.getScale();
            // var mouse = self.getPosition(e);
            // console.log(e, mouse.x/s, mouse.y/s);
        // }
        
        // $(window).on('mydraw', function(){
            // self.draws = window.draws;
            // self.clear();
            // self.draw();
        // });
    }

    Arrows.prototype = new app.Figure();

    app.Arrows = Arrows;
});