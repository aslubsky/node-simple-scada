define([
    'app',
    'base/canvas/figure'
], function (app) {
    'use strict';

    function ClBarrel() {
        this.draws = [];
        var self = this;
        this.color = '#D9D4D3';
        this.value = 0;
        this.alarmValue = null;
        this.name = '';
        
        this.x = 367;
        this.y = 185;
        this.width = 57;
        this.height = 110;

        this.draws.push(function() {
            this.ctx.beginPath();
            this.ctx.moveTo(368,207);
            this.ctx.bezierCurveTo(368,178,424,178,424,207);
            this.ctx.lineTo(424,271);
            this.ctx.bezierCurveTo(424,300,368,300,368,271);
            this.ctx.closePath();
        });

        this.draws.push(function() {
            this.ctx.beginPath();
            this.ctx.moveTo(368,207);
            this.ctx.bezierCurveTo(368,229,424,229,424,207);
        });

        this.draws.push(function() {
            this.ctx.beginPath();
            this.ctx.moveTo(368,257);
            this.ctx.bezierCurveTo(368,279,424,279,424,257);
        });

        this.draws.push(function() {
            this.ctx.beginPath();
            this.ctx.moveTo(368,262);
            this.ctx.bezierCurveTo(368,284,424,284,424,262);
        });
        
        this.onDialog = function () {
            this.$scope.dialogMessage = 'Cl: '+this.value;
            this.$scope.$apply();
        }
        
        this.onDrawStop = function() {
            $('.t3').css({
                left: Math.ceil(384*self.getScale())+'px',
                top: Math.ceil(225*self.getScale())+'px',
                color: self.color,
                'font-size': Math.ceil(24*self.getScale())+'px'
            }).on('click', function(e){
                self.onSelect(e);
            });
        }
    }

    ClBarrel.prototype = new app.Figure();

    app.ClBarrel = ClBarrel;
});