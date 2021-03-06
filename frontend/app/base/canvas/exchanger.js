define([
    'app',
    'base/canvas/figure'
], function (app) {
    'use strict';

    function Exchanger() {
        this.draws = [];
        var self = this;
        this.color = '#D9D4D3';
        this.value = 0;
        this.name = '';

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
        
        this.onDialog = function () {
            this.$scope.dialogMessage = 'Температура: '+this.value;
            this.$scope.$apply();
        }
        
        this.onDrawStart = function () {
            this.ctx.fillStyle = this.color;
            this.ctx.strokeStyle = this.color;
        }

        this.onDrawStop = function () {
            this.ctx.fillStyle = "transparent";
            this.ctx.strokeStyle = this.color;
            this.color = '#D9D4D3';
        }
    }

    Exchanger.prototype = new app.Figure();

    app.Exchanger = Exchanger;
});