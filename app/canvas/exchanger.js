function Exchanger() {
    this.draws = [];
    var self = this;
    this.color = '#D9D4D3';
    this.textColor = '#D9D4D3';
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
//        $('.canvas-dialog').text('Температура: '+this.value);
    }

    this.onDrawStart = function () {
        this.ctx.fillStyle = this.color;
        this.ctx.strokeStyle = this.color;
    }

    this.onDrawStop = function () {
        this.ctx.fillStyle = "transparent";
        this.ctx.strokeStyle = this.color;
        this.color = '#D9D4D3';

        $('.t4').css({
            left: Math.ceil(304*self.getScale())+'px',
            top: Math.ceil(40*self.getScale())+'px',
            color: self.textColor,
            'font-size': Math.ceil(16*self.getScale())+'px'
        })
            .html(this.value+' °C');
    }
}

Exchanger.prototype = new Figure();