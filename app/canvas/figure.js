function Figure() {
    this.draws = [];
    //var self = this;
}
Figure.prototype.setScope = function($scope, name) {
    this.$scope = $scope;
    this.canvas = $scope.canvas;
    this.name = name;
    this.ctx = $scope.canvas.getContext("2d");
    var self = this;
    this.canvas.addEventListener('mousedown', function(e){
        self.onSelect(e);
    }, false);
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
    this.ctx.miterLimit = this.getMiterLimit();
    this.ctx.fillStyle = "transparent";
    this.ctx.strokeStyle = this.color;

    for (; i < l; i++) {
        this.draws[i].apply(this);
        this.ctx.stroke();
    }
    this.onDrawStop();

    this.ctx.restore();
}

Figure.prototype.getLineWidth = function() {
    return 2;
}
Figure.prototype.getMiterLimit = function() {
    return 10;
}

Figure.prototype.getScale = function() {
    return this.$scope.getScale();
}

Figure.prototype.getPosition = function(e) {
    var bbox = this.canvas.getBoundingClientRect();

    return {
        x: e.clientX - bbox.left * (this.canvas.width  / bbox.width),
        y: e.clientY - bbox.top  * (this.canvas.height / bbox.height)
    };
}

Figure.prototype.startAlarm = function(type) {
    var self = this;
    var defColor = self.getColorDefault();
    var alColor = self.getColorAlarm();
    this.alarmTimer = setTimeout(function(){
        if(self.alarmTimer == null) {
            return;
        }
        if(self.color == alColor) {
            self.color = defColor;
        } else {
            self.color = alColor;
        }
        self.drawAlarm(type);
        self.startAlarm();
    }, 1000);
}

Figure.prototype.clear = function() {
    this.ctx.clearRect(this.x, this.y, this.width, this.height);
}

Figure.prototype.inFigure = function(mouse) {
    var s = this.getScale();
    if (this.x * s < mouse.x &&
        this.x * s + this.width * s > mouse.x &&
        this.y * s < mouse.y &&
        this.y * s + this.height * s > mouse.y) {
        return true;
    }
    return false;
}

Figure.prototype.setValue = function(value) {
    this.value = value;
    if(this.$scope.hideDialog == false && this.$scope.dialogName == this.name) {
        this.onDialog();
    }
}

Figure.prototype.setAlarmValue = function(value, dsName) {
    if(this.alarmValue != null && this.alarmValue != value) {
        //console.log(value, dsName);
        if(value) {
            this.startAlarm();
        } else {
            this.stopAlarm();
        }
    }
    this.alarmValue = value;
}

Figure.prototype.stopAlarm = function() {
    this.alarmTimer = null;
    this.color = this.getColorDefault();
    this.drawAlarm();
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
Figure.prototype.onSelect = function (e) {
    var mouse = this.getPosition(e);
    //console.log(e, this.name);
    // console.log(e, mouse, this.inFigure(mouse));
    if (this.inFigure(mouse)) {
        // console.log('OK');
        this.$scope.dialogName = this.name;
        this.$scope.hideDialog = false;
        $('.canvas-dialog').show();
        $('.container-main').addClass('overlay');
        this.onDialog();
    }
}
Figure.prototype.onDialog = function () {
}