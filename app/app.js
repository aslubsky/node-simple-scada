define([
    'main',
    'canvas/arrows',
    'canvas/clbarrel',
    'canvas/exchanger',
    'canvas/figure',
    'canvas/h2obarrel',
    'canvas/other',
    'canvas/phbarrel',
    'canvas/watercounter'
], function(app) {
//    console.log('APP', 'main->', app);

    var $scope = {};

    $scope.getOrigWidth = function () {
        return 480;
    }
    $scope.getOrigHeight = function () {
        return 300;
    }
    $scope.getScale = function () {
        var scale = (window.innerWidth / $scope.getOrigWidth());
        if (this.getOrigHeight() * scale > window.innerHeight) {
            scale = window.innerHeight / $scope.getOrigHeight();
        }
        return scale;
    }
    $scope.initScreen = function () {
        var scale = $scope.getScale();
        //console.log(s);
        this.canvas.width = Math.ceil($scope.getOrigWidth() * scale);
        this.canvas.height = Math.ceil($scope.getOrigHeight() * scale);

        $('#canvas-container').css({
            width: this.canvas.width + 'px',
            height: this.canvas.height + 'px'
        });
    }

    $scope.draw = function () {
        _.each($scope.figures, function (o) {
            o.draw();
        });
    }

    $scope.clear = function () {
        $scope.canvas.getContext('2d').clearRect(0, 0, $scope.canvas.width, $scope.canvas.height);
    }

    $scope.drawDialog = function () {
        var scale = $scope.getScale();
        var bbox = $scope.canvas.getBoundingClientRect();
        $('.canvas-dialog').css({
            width: Math.ceil($scope.canvas.width / 2) + 'px',
            marginLeft: '-'+Math.ceil($scope.canvas.width / 4)+'px',
            //left: Math.ceil(bbox.left + $scope.canvas.width / 2 - $('.canvas-dialog').width() / 2) + 'px',
            top: Math.ceil(100 * scale) + 'px',
            maxWidth: Math.ceil($scope.canvas.width / 2) + 'px',
            fontSize: Math.ceil(24 * scale) + 'px'
        });
    }

    $scope.canvas = document.getElementById('canvas');

    $scope.figures = {};
    $scope.figures.arrows = new app.Arrows();
    $scope.figures.h2o = new app.H2OBarrel();
    $scope.figures.ph = new app.pHBarrel();
    $scope.figures.cl = new app.ClBarrel();
    $scope.figures.watercounter = new app.WaterCounter();
    $scope.figures.exchanger = new app.Exchanger();
    $scope.figures.other = new app.Other();

    _.each($scope.figures, function (o, k) {
        o.setScope($scope, k);
    });

    $scope.initScreen();
    $scope.draw();
    $scope.drawDialog();

    $(window).resize(function(){
        $scope.initScreen();
        $scope.clear();
        $scope.draw();
        $scope.drawDialog();
    });


    $('.canvas-dialog').on('click', function(){
        if($scope.hideDialog == false) {
            $('.canvas-dialog').hide();
            $('.container-main').removeClass('overlay');
            $scope.hideDialog = true;
        }
    });



    var dataNamesMap = {
        'trm1': 'exchanger',
        'ph': 'ph',
        'orp': 'cl'
    };
    var alarmNamesMap = {
        'relay1': 'ph',
        'relay2': 'cl'
    };

    $scope.socket = io.connect('http://'+window.location.hostname+':8085');
    $scope.socket.on('connect', function(socket) {
        // console.log('connect');
    });
    $scope.socket.on('error', function(socket) {
        // console.log('error');
    });
    $scope.socket.on('disconnect', function(socket) {
        // console.log('disconnect');
    });

    $scope.socket.on('onDataRead', function (data) {
        if(dataNamesMap[data.name] != undefined) {
            $scope.figures[dataNamesMap[data.name]].setValue(data.value);
        }
        if(alarmNamesMap[data.name] != undefined) {
            $scope.figures[alarmNamesMap[data.name]].setAlarmValue(data.value, data.name);
        }
        //                console.log(data);
    });

    $(window).blur(function(){
        $scope.socket.disconnect();
    });
    $(window).focus(function(){
        $scope.socket.socket.connect();
    });

    return app;
});