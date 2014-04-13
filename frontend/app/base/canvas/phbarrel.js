define([
    'app',
    'base/canvas/figure'
], function (app) {
    'use strict';

    function pHBarrel() {
        this.draws = [];
        this.color = '#D9D4D3';
        var self = this;
        this.value = 0;
        this.alarmValue = null;
        this.name = '';
        
        this.x = 273;
        this.y = 185;
        this.width = 57;
        this.height = 110;

        this.draws.push(function() {
            this.ctx.beginPath();
            this.ctx.moveTo(273,207);
            this.ctx.bezierCurveTo(273,177,329,177,329,207);
            this.ctx.lineTo(329,270);
            this.ctx.bezierCurveTo(329,300,273,300,273,270);
            this.ctx.closePath();
        });

        this.draws.push(function() {
            this.ctx.beginPath();
            this.ctx.moveTo(273,207);
            this.ctx.bezierCurveTo(273,229,329,229,329,207);
        });

        this.draws.push(function() {
            this.ctx.beginPath();
            this.ctx.moveTo(273,257);
            this.ctx.bezierCurveTo(273,279,329,279,329,257);
        });

        this.draws.push(function() {
            this.ctx.beginPath();
            this.ctx.moveTo(273,262);
            this.ctx.bezierCurveTo(273,284,329,284,329,262);
        });
        
        this.onDialog = function () {
            this.$scope.dialogMessage = 'pH: '+this.value;
            this.$scope.$apply();
        }
        
        this.onDrawStop = function() {
            $('.t2').css({
                left: Math.ceil(284*self.getScale())+'px',
                top: Math.ceil(225*self.getScale())+'px',
                color: self.color,
                'font-size': Math.ceil(24*self.getScale())+'px'
            }).on('click', function(e){
                self.onSelect(e);
            });
        }
    }

    pHBarrel.prototype = new app.Figure();

    app.pHBarrel = pHBarrel;
});