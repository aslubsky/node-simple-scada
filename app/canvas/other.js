function Other() {
    this.draws = [];
    var self = this;
    this.color = '#D9D4D3';

    /* pH */
    this.draws.push(function () {
        this.ctx.beginPath();
        this.ctx.moveTo(300, 131.75);
        this.ctx.bezierCurveTo(310.6314814342428, 131.75, 319.25, 140.36851856575723, 319.25, 151);
        this.ctx.bezierCurveTo(319.25, 161.63148143424277, 310.6314814342428, 170.25, 300, 170.25);
        this.ctx.bezierCurveTo(289.3685185657572, 170.25, 280.75, 161.63148143424277, 280.75, 151);
        this.ctx.bezierCurveTo(280.75, 140.36851856575723, 289.3685185657572, 131.75, 300, 131.75);
        this.ctx.closePath();
    });
    this.draws.push(function () {
        this.ctx.beginPath();
        this.ctx.moveTo(300, 132);
        this.ctx.lineTo(320, 151);
        this.ctx.lineTo(300, 170);
    });
    this.draws.push(function () {
        this.ctx.beginPath();
        this.ctx.moveTo(300, 178);
        this.ctx.lineTo(300, 185);
    });
    this.draws.push(function () {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.moveTo(300, 171);
        this.ctx.lineTo(303, 178);
        this.ctx.lineTo(300, 178);
        this.ctx.lineTo(297, 178);
        this.ctx.closePath();
        this.ctx.fill();
    });
    this.draws.push(function () {
        this.ctx.beginPath();
        this.ctx.moveTo(301, 132);
        this.ctx.lineTo(301, 126);
        this.ctx.quadraticCurveTo(301, 120, 311, 120);
        this.ctx.lineTo(424, 120);
        this.ctx.quadraticCurveTo(434, 120, 434, 110);
        this.ctx.lineTo(434, 77);
    });
    this.draws.push(function () {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.moveTo(434, 72);
        this.ctx.lineTo(437, 79);
        this.ctx.lineTo(434, 79);
        this.ctx.lineTo(431, 79);
        this.ctx.closePath();
        this.ctx.fill();
    });
    /* pH */

    /*Temp*/
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
    /*Temp*/

    /*Cl*/
    this.draws.push(function () {
        this.ctx.beginPath();
        this.ctx.moveTo(395, 131.75);
        this.ctx.bezierCurveTo(405.6314814342428, 131.75, 414.25, 140.36851856575723, 414.25, 151);
        this.ctx.bezierCurveTo(414.25, 161.63148143424277, 405.6314814342428, 170.25, 395, 170.25);
        this.ctx.bezierCurveTo(384.3685185657572, 170.25, 375.75, 161.63148143424277, 375.75, 151);
        this.ctx.bezierCurveTo(375.75, 140.36851856575723, 384.3685185657572, 131.75, 395, 131.75);
        this.ctx.closePath();
    });
    this.draws.push(function () {
        this.ctx.beginPath();
        this.ctx.moveTo(395, 132);
        this.ctx.lineTo(415, 151);
        this.ctx.lineTo(395, 171);
    });
    this.draws.push(function () {
        this.ctx.beginPath();
        this.ctx.moveTo(396, 185);
        this.ctx.lineTo(396, 178);
    });
    this.draws.push(function () {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.moveTo(396, 171);
        this.ctx.lineTo(399, 178);
        this.ctx.lineTo(396, 178);
        this.ctx.lineTo(393, 178);
        this.ctx.closePath();
        this.ctx.fill();
    });
    this.draws.push(function () {
        this.ctx.beginPath();
        this.ctx.moveTo(395, 132);
        this.ctx.lineTo(395, 126);
        this.ctx.quadraticCurveTo(395, 120, 405, 120);
        this.ctx.lineTo(424, 120);
        this.ctx.quadraticCurveTo(434, 120, 434, 110);
        this.ctx.lineTo(434, 77);
    });
    /*Cl*/


    this.onDrawStart = function () {
        this.ctx.fillStyle = this.color;
        this.ctx.strokeStyle = this.color;
    }

    this.onDrawStop = function () {
        this.ctx.fillStyle = "transparent";
        this.ctx.strokeStyle = this.color;
    }
}

Other.prototype = new Figure();