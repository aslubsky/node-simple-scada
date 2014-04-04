define('figure', [
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
        //console.log('draw', this);
        var i = 0;
        var l = this.draws.length;
        var s = this.getScale();
        //this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.onDrawStart();
        for (; i < l; i++) {
            this.ctx.save();
            this.ctx.scale(s, s);
            this.draws[i](this.ctx);
            this.ctx.fill();
            this.ctx.stroke();
            this.ctx.restore();
        }
        this.onDrawStop();
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

        //canvas.width = window.innerWidth;
        //canvas.height = window.innerHeight;

        var scale = (window.innerWidth / this.getOrigWidth());
        if (this.getOrigHeight() * scale > window.innerHeight) {
            scale = window.innerHeight / this.getOrigHeight();
        }
        return scale;
    }

    app.Figure = Figure;
});