define([
    'angular',
    'app'
], function (angular, app) {
    'use strict';

    function Figure() {
        this.draws = [];
    }
    Figure.prototype.setCanvas = function(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    }
    Figure.prototype.onDrawStart = function() {
    }
    Figure.prototype.onDrawStop = function() {
    }
    Figure.prototype.draw = function() {
        this.ctx.save();
        var i = 0;
        var l = this.draws.length;
        var s = this.getScale();

        this.onDrawStart();
        this.ctx.scale(s, s);
        this.clear();

        this.ctx.lineWidth = this.getLineWidth();
        this.ctx.miterLimit = 10;
        this.ctx.fillStyle = "transparent";
        this.ctx.strokeStyle = this.color;

        for (; i < l; i++) {
            this.draws[i].apply(this);
            this.ctx.stroke();
        }
        this.onDrawStop();

        this.ctx.restore();
    }

    Figure.prototype.getOrigWidth = function() {
        return 480;
    }
    Figure.prototype.getOrigHeight = function() {
        return 300;
    }
    Figure.prototype.getLineWidth = function() {
        return 2;
    }
    Figure.prototype.getMiterLimit = function() {
        return 10;
    }

    Figure.prototype.getScale = function() {
        //width=480
        //height=300
        var scale = (window.innerWidth / this.getOrigWidth());
        if (this.getOrigHeight() * scale > window.innerHeight) {
            scale = window.innerHeight / this.getOrigHeight();
        }
        return scale;
    }

    Figure.prototype.startAlarm = function(type) {
        var self = this;
        var defColor = self.getColorDefault();
        var alColor = self.getColorAlarm();
        this.alarmTimer = setTimeout(function(){
            if(self.color == alColor) {
                self.color = defColor;
            } else {
                self.color = alColor;
            }
            self.drawAlarm(type);
            if(self.alarmTimer != null) {
                self.startAlarm();
            }
        }, 1000);
    }

    Figure.prototype.clear = function() {
    }

    Figure.prototype.stopAlarm = function() {
        this.alarmTimer = null;
    }

    Figure.prototype.drawAlarm = function(type) {
        this.draw();
    }

    Figure.prototype.getColorDefault = function() {
        return '#D9D4D3';
    }
    Figure.prototype.getColorAlarm = function() {
        return 'red';
    }

    app.Figure = Figure;
});