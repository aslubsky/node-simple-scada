function Arrows() {
    this.draws = [];
    this.color = '#D9D4D3';
    this.animations = [
        {
            name: 'arr1',
            pos: 0,
            limit: 4,
            clear: function (ctx) {
                ctx.clearRect(0, 105, 37, 34);
            },
            draw: function(ctx) {
                ctx.moveTo(8 * this.pos, 107);
                ctx.lineTo(8 * this.pos, 137);
            }
        },
        {
            name: 'arr2',
            pos: 0,
            limit: 6,
            clear: function (ctx) {
                ctx.clearRect(192, 105, 34, 58);
            },
            draw: function(ctx) {
                ctx.moveTo(192, 158 - (8 * this.pos));
                ctx.lineTo(225, 158 - (8 * this.pos));
            }
        },
        {
            name: 'arr3',
            pos: 0,
            limit: 2,
            clear: function (ctx) {
                ctx.clearRect(239, 37, 20, 34);
            },
            draw: function(ctx) {
                ctx.moveTo(241 + (8 * this.pos), 38);
                ctx.lineTo(241 + (8 * this.pos), 70);
            }
        },
        {
            name: 'arr4',
            pos: 0,
            limit: 4,
            clear: function (ctx) {
                ctx.clearRect(415, 37, 35, 34);
            },
            draw: function(ctx) {
                ctx.moveTo(412 + (8 * this.pos), 38);
                ctx.lineTo(412 + (8 * this.pos), 70);
            }
        }
    ];
    this.animationTimer = null;
    this.showAnimation = true;
    this.ANIMATION_TIME = 300;

    var self = this;

    this.draws.push(function () {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.moveTo(2, 19);
        this.ctx.lineTo(20, 19);
        this.ctx.lineTo(20, 10);
        this.ctx.lineTo(32, 25);
        this.ctx.lineTo(20, 40);
        this.ctx.lineTo(20, 32);
        this.ctx.lineTo(2, 32);
        this.ctx.closePath();
        this.ctx.fill();
    });

    this.draws.push(function () {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.moveTo(2, 107);
        this.ctx.lineTo(38, 107);
        this.ctx.lineTo(38, 87);
        this.ctx.lineTo(61, 122);
        this.ctx.lineTo(38, 157);
        this.ctx.lineTo(38, 137);
        this.ctx.lineTo(2, 137);
        this.ctx.closePath();
        this.ctx.fill();
    });

    this.draws.push(function () {
        this.ctx.save();
        this.ctx.fillStyle = this.color;
        this.ctx.translate(109, 39);
        this.ctx.rotate(1.5707963267948966);
        this.ctx.translate(-109, -39);
        this.ctx.beginPath();
        this.ctx.moveTo(101, 64);
        this.ctx.lineTo(101, 38);
        this.ctx.bezierCurveTo(101, 38, 101, 37, 101, 37);
        this.ctx.bezierCurveTo(102, 36, 102, 36, 103, 36);
        this.ctx.lineTo(113, 36);
        this.ctx.lineTo(113, 43);
        this.ctx.lineTo(128, 28);
        this.ctx.lineTo(113, 13);
        this.ctx.lineTo(113, 20);
        this.ctx.lineTo(103, 20);
        this.ctx.bezierCurveTo(95, 20, 88, 28, 88, 38);
        this.ctx.lineTo(88, 64);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.restore();
    });

    this.draws.push(function () {
        this.ctx.save();
        this.ctx.fillStyle = this.color;
        this.ctx.moveTo(178, 174);
        this.ctx.quadraticCurveTo(194, 174, 194, 154);
        this.ctx.lineTo(194, 104);
        this.ctx.lineTo(184, 104);
        this.ctx.lineTo(209, 85);
        this.ctx.lineTo(234, 104);
        this.ctx.lineTo(224, 104);
        this.ctx.lineTo(224, 154);
        this.ctx.quadraticCurveTo(224, 204, 178, 204);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.restore();
    });

    this.draws.push(function () {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.moveTo(241, 39);
        this.ctx.lineTo(260, 39);
        this.ctx.lineTo(260, 19);
        this.ctx.lineTo(273, 54);
        this.ctx.lineTo(260, 89);
        this.ctx.lineTo(260, 69);
        this.ctx.lineTo(241, 69);
        this.ctx.closePath();
        this.ctx.fill();
    });

    this.draws.push(function () {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.moveTo(413, 39);
        this.ctx.lineTo(451, 39);
        this.ctx.lineTo(451, 20);
        this.ctx.lineTo(476, 55);
        this.ctx.lineTo(451, 90);
        this.ctx.lineTo(451, 69);
        this.ctx.lineTo(413, 69);
        this.ctx.closePath();
        this.ctx.fill();
    });

    this.onDrawStart = function () {
        this.ctx.fillStyle = this.color;
        this.ctx.strokeStyle = "#D9D4D3";
    }

    this.onAnimationStart = function () {
        if(!self.showAnimation) {
            return;
        }
        self.animationTimer = setTimeout(self.animationCb, self.ANIMATION_TIME);
    }

    this.onDrawStop = function () {
        this.ctx.fillStyle = "transparent";
        this.ctx.strokeStyle = "#D9D4D3";
    }

    this.animationCb = function () {
//        console.log(self);
        var i;
        for (i = 0; i < self.animations.length; i++) {
            if (self.animations[i].pos > self.animations[i].limit) {
                self.animations[i].pos = 0;
            }
        }

        self.ctx.save();
        var s = self.getScale();
        self.ctx.scale(s, s);

        for (i = 0; i < self.animations.length; i++) {
            if (self.animations[i].pos == 0) {
                self.animations[i].clear(self.ctx);

//                console.log(self.animations[i].pos);
            }
        }

        self.ctx.beginPath();
        self.ctx.strokeStyle = "#D9D4D3";
        self.ctx.lineWidth = 4;
        for (i = 0; i < self.animations.length; i++) {
            self.animations[i].draw(self.ctx);
            self.animations[i].pos++;
        }
        self.ctx.stroke();
        self.ctx.restore();

        self.animationTimer = setTimeout(self.animationCb, self.ANIMATION_TIME);
    }
    this.clear = function () {
        //this.ctx.clearRect(178, 85, 70, 302);
    }
}

Arrows.prototype = new Figure();