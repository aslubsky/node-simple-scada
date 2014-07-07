var App = function () {
    var self = this;

    this.REQ_TIME = 1000;
    this.mainTimer = null;
    this.dataNamesMap = {
        'trm1': 'exchanger',
        'ph': 'ph',
        'orp': 'cl'
    };
    this.alarmNamesMap = {
        'relay1': 'ph',
        'relay2': 'cl'
    };

    this.hideDialog = true;

    // Application Constructor
    this.initialize = function () {
        this.bindEvents();

        this.canvas = document.getElementById('canvas');

        this.figures = {};
        this.figures.arrows = new Arrows();
        this.figures.h2o = new H2OBarrel();
        this.figures.ph = new pHBarrel();
        this.figures.cl = new ClBarrel();
        this.figures.watercounter = new WaterCounter();
        this.figures.exchanger = new Exchanger();
        this.figures.other = new Other();

        $.each(this.figures, function (k, o) {
//            console.log(o, k);
            o.setScope(self, k);
        });

        $('.canvas-dialog').on('click', function () {
            if (self.hideDialog == false) {
                $('.canvas-dialog').hide();
                $('.container-main').removeClass('overlay');
                self.hideDialog = true;
            }
        });
    }

    // 'load', 'deviceready', 'offline', and 'online'.
    this.bindEvents = function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('resume', function(){
            self.mainTimer = setTimeout(self.mainTimerCb, self.REQ_TIME);
            self.reDraw();
        }, false);
        document.addEventListener('pause', function(){
            clearTimeout(self.mainTimer);
            self.mainTimer = null;
        }, false);
//        document.addEventListener("throttledresize", this.onDeviceReady, false);
//        document.addEventListener("orientationchange", this.onDeviceReady, false);
//        $(this.onDeviceReady);

//        document.addEventListener('online', function () {
//            self.clear();
//            $.each(self.figures, function (k, o) {
//                o.showAnimation = true;
//            });
//            self.onDeviceReady();
//        }, false);
//        document.addEventListener('offline', function () {
//            self.clear();
//            $.each(self.figures, function (k, o) {
//                o.showAnimation = false;
//                o.onAnimationStop();
//            });
//            self.onDeviceReady();
//        }, false);

        $(window).resize(function(){
            self.reDraw();
        });
    }

    this.reDraw = function () {
        this.clear();
        $.each(this.figures, function (k, o) {
            o.onAnimationStop();
        });
        this.initScreen();
        this.draw();
    }
    this.onDeviceReady = function (e) {
//        console.log('onDeviceReady', e);
        $('.canvas-text').each(function () {
            FastClick.attach(this);
        });
        setTimeout(function(){
            self.reDraw();
        }, 200);
        self.mainTimer = setTimeout(self.mainTimerCb, self.REQ_TIME);
    }

    this.formatNumber = function (val) {
        return parseFloat(val.substring(0, 4));
    }
    this.mainTimerCb = function () {
        $.ajax({
            dataType: "jsonp",
            url: 'http://s.equalteam.net/api/api.php',
            success: function (allData) {
                $.each(allData, function (k, data) {
                    //                console.log(data.name, dataNamesMap);
                    if (self.dataNamesMap[data.name] != undefined) {
                        self.figures[self.dataNamesMap[data.name]].setValue(self.formatNumber(data.value));
                        self.figures[self.dataNamesMap[data.name]].setTextColor(data.color);
                        self.figures[self.dataNamesMap[data.name]].onDrawStop();
                    }
                    if (self.alarmNamesMap[data.name] != undefined) {
                        self.figures[self.alarmNamesMap[data.name]].setAlarmValue(data.value, data.name);
                    }
                });
            }
        });
        self.mainTimer = setTimeout(self.mainTimerCb, self.REQ_TIME);
    }
    this.getOrigWidth = function () {
        return 480;
    }
    this.getOrigHeight = function () {
        return 300;
    }
    this.getScale = function () {
        var scale = ($(window).width() / this.getOrigWidth());
        if (this.getOrigHeight() * scale > ($(window).height())) {
            scale = ($(window).height()) / this.getOrigHeight();
        }
        return scale;
    }
    this.initScreen = function () {
        var scale = this.getScale();
        //console.log(s);
        this.canvas.width = Math.ceil(this.getOrigWidth() * scale);
        this.canvas.height = Math.ceil(this.getOrigHeight() * scale);

        $('#canvas-container').css({
            width: this.canvas.width + 'px',
            height: this.canvas.height + 'px'
        });
        if (this.canvas.height + 10 < window.innerHeight) {
            var offset = Math.ceil((window.innerHeight - this.canvas.height - 2) / 2);
            $('#canvas-container').css({
                'margin': offset + 'px auto'
            });
        }
    }
    this.draw = function () {
        $.each(this.figures, function (k, o) {
//            console.log(o, k);
            o.draw();
        });
    }


    this.clear = function () {
        this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    this.drawDialog = function () {
        var scale = this.getScale();
        var bbox = this.canvas.getBoundingClientRect();
        $('.canvas-dialog').css({
            width: Math.ceil(this.canvas.width / 2) + 'px',
            marginLeft: '-' + Math.ceil(this.canvas.width / 4) + 'px',
            //left: Math.ceil(bbox.left + this.canvas.width / 2 - $('.canvas-dialog').width() / 2) + 'px',
            top: Math.ceil(100 * scale) + 'px',
            maxWidth: Math.ceil(this.canvas.width / 2) + 'px',
            fontSize: Math.ceil(24 * scale) + 'px'
        });
    }

};