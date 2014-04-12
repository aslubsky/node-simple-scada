define([
    'app',
    'base/canvas/figure'
], function (app) {
    'use strict';

    function Exchanger() {
        this.draws = [];
        var self = this;
        this.color = '#D9D4D3';

        this.x = 275;
        this.y = 5;
        this.width = 141;
        this.height = 96;
        
        this.draws.push(function () {
            this.ctx.beginPath();
            this.ctx.moveTo(277, 9);
            this.ctx.lineTo(386, 9);
            this.ctx.lineTo(400, 39);
            this.ctx.lineTo(413, 39);
            this.ctx.lineTo(413, 70);
            this.ctx.lineTo(400, 70);
            this.ctx.lineTo(386, 100);
            this.ctx.lineTo(277, 100);
            this.ctx.closePath();
        });
        this.draws.push(function () {
            this.ctx.beginPath();
            this.ctx.moveTo(277, 54);
            this.ctx.lineTo(400, 54);
            this.ctx.lineTo(386, 85);
            this.ctx.lineTo(359, 24);
            this.ctx.lineTo(332, 85);
            this.ctx.lineTo(304, 24);
            this.ctx.lineTo(291, 55);
        });
        this.draws.push(function () {
            this.ctx.beginPath();
            this.ctx.moveTo(209, 28.562499999999996);
            this.ctx.bezierCurveTo(223.6010280736516, 28.562499999999996, 235.4375, 40.398971926348395, 235.4375, 55);
            this.ctx.bezierCurveTo(235.4375, 69.6010280736516, 223.6010280736516, 81.4375, 209, 81.4375);
            this.ctx.bezierCurveTo(194.3989719263484, 81.4375, 182.5625, 69.6010280736516, 182.5625, 55);
            this.ctx.bezierCurveTo(182.5625, 40.398971926348395, 194.3989719263484, 28.562499999999996, 209, 28.562499999999996);
            this.ctx.closePath();
        });
        this.draws.push(function () {
            this.ctx.beginPath();
            this.ctx.moveTo(209, 28);
            this.ctx.lineTo(236, 55);
            this.ctx.lineTo(209, 81);
        });
        
        this.onSelect = function (e) {
            var mouse = self.getPosition(e);
            // console.log(e, mouse, self.inFigure(mouse));
            if (self.inFigure(mouse)) {
                // console.log('OK');
                self.$scope.hideDialog = false;
                self.$scope.dialogMessage = 'Температура: 27.5';
                self.$scope.$apply();
            }
        }
        
        this.onDrawStart = function () {
            this.ctx.fillStyle = this.color;
            this.ctx.strokeStyle = this.color;
        }

        this.onDrawStop = function () {
            this.ctx.fillStyle = "transparent";
            this.ctx.strokeStyle = this.color;
        }
    }

    Exchanger.prototype = new app.Figure();

    app.Exchanger = Exchanger;
});