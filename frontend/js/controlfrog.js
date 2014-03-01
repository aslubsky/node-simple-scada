// Colour settings
if(themeColour == 'white'){
    var metric = '#a9a9a9';
    var backColor = '#7d7d7d';
    var pointerColor = '#898989';     
    var pageBackgorund = '#fff';
    var pieTrack = metric;
    var pieBar = backColor;
    var gaugeTrackColor = metric;
    var gaugeBarColor = backColor;
    var gaugePointerColor = '#ccc';
    var pieSegColors = [metric,'#868686','#636363','#404040','#1d1d1d'];    
}
else {
    //default to black
    var backColor = '#4f4f4f';
    var metric = '#f2f2f2';    
    var pointerColor = '#898989'; 
    var pageBackgorund = '#2b2b2b';    
    var pieSegColors = [metric,'#c0c0c0','#8e8e8e','#5b5b5b','#292929'];
    var pieTrack = backColor;
    var pieBar = metric;
    var gaugeTrackColor = '#4f4f4f';
    var gaugeBarColor = '#898989';
    var gaugePointerColor = metric;
}

// Stores
var cf_rSVPs = [];
var cf_rGs = [];
var cf_rLs = [];
var cf_rPs = [];
var cf_rRags = [];
var cf_rFunnels = [];

 var socket = io.connect('http://localhost:8085');

$(document).ready(function(){

    // Make items square
    cfSizeItems();
    
    // Navigation 
    $('.cf-nav-toggle').click(function(e){

        if( $('.cf-nav').hasClass('cf-nav-state-min') ){
            $('.cf-nav').removeClass('cf-nav-state-min').addClass('cf-nav-state-max');
            $('.cf-container').addClass('cf-nav-state-max');
        }
        else{
            $('.cf-nav').removeClass('cf-nav-state-max').addClass('cf-nav-state-min');        
            $('.cf-container').removeClass('cf-nav-state-max');            
        }
        
        e.preventDefault();
    });
}); // end doc ready


/*
*
* Line charts (cf-line)
*
*/
$(document).ready(function(){

    // Default line chart options
    window.cf_lineDefaultOpts = {};
    cf_lineDefaultOpts.datasetFill = false;
    cf_lineDefaultOpts.scaleMaxMinLabels = true;
    cf_lineDefaultOpts.scaleShowGridLines = false;
    cf_lineDefaultOpts.pointDot = false;
    cf_lineDefaultOpts.scaleLineColor = 'transparent';
    cf_lineDefaultOpts.bezierCurve = false;
    cf_lineDefaultOpts.scaleFontSize = 10;


    // Initialise chart
    /*
    *    Copy the each() function for each line chart you have
    *     e.g. $('#line-1').each(function(){.....}
    */    
    $('.cf-line').each(function(){
        // Dummy data for line chart
        var ldata = {
            labels : ["5/13","","","","","","11/13"],
            datasets : [
                {
                    strokeColor : metric,
                    data : [65,59,40,81,56,55,90]
                }
            ]
        }
    
        var $container = $(this);
        var lId = $container.prop('id');
        
        // Store chart information
        cf_rLs[lId] = {};
        cf_rLs[lId].data = ldata;
        
        /*
        // Set options per chart
        customOptions = {};
        customOptions.scaleMaxMinLabels = false;
        cf_rLs[lId].options = customOptions;
        */
        
        // Create chart
        createLineChart($container);
    });
    
}); // end doc ready

function createLineChart(obj){
    $(window).resize(generateLineChart);

    function generateLineChart(){
        $container = obj;
        lId = $container.prop('id');

        var $canvas = $('canvas', $container);
        var cWidth = $container.width();
        var cHeight = $container.height();        
        
        console.log(cWidth, cHeight);

        // Get canvas context        
        var ctx = $canvas.get(0).getContext('2d');

        //Set canvas size
        $canvas.prop({width:cWidth,height:cHeight});
        
        // Check for custom options
        var lineOptions;
        if(cf_rLs[lId].options){
            var lineOptions = $.extend({}, cf_lineDefaultOpts, cf_rLs[lId].options);
        }
        else{
            lineOptions = cf_lineDefaultOpts;
        }

        // Create chart        
        new Chart(ctx).Line(cf_rLs[lId].data,lineOptions);
    }
    
    // Call once on page load
    generateLineChart();
}


/*
*
* Sparklines (cf-svmc-sparkline)
*
*/
$(document).ready(function(){
    // Set up default options    
    window.cf_defaultSparkOpts = {};
    cf_defaultSparkOpts.fillColor = false;
    cf_defaultSparkOpts.lineColor = metric;
    cf_defaultSparkOpts.lineWidth = 1.5;
    cf_defaultSparkOpts.minSpotColor = false;
    cf_defaultSparkOpts.maxSpotColor = false;
    cf_defaultSparkOpts.spotRadius = 2.5;
    cf_defaultSparkOpts.highlightLineColor = metric;
    cf_defaultSparkOpts.spotColor = '#f8f77d';
    
    window.sparkData = {};
    
    window.sparkData.trm1 = [];
    window.sparkData.trm2 = [];
    createSparkline($('#spark-1'), window.sparkData.trm1, cf_defaultSparkOpts);
    createSparkline($('#spark-2'), window.sparkData.trm2, cf_defaultSparkOpts);
});

function updateSparkline(obj, data, sparkOptions){
    var $parent = obj.parent().parent();
    $('.sparkline-value .metric-small', $parent).html(data[data.length-1]);
    obj.sparkline(data, cf_defaultSparkOpts);
}
function createSparkline(obj, data, sparkOptions){
    
    $(window).resize(generateSparkline);
    
    function generateSparkline(){
        var ww = $(window).width();
        var $obj = obj;            
        var $parent = $obj.parent().parent();
    
        // Current value
        $('.sparkline-value .metric-small', $parent).html(data[data.length-1]);
    
        // Sizing
        if(ww < 768){
            var cWidth = $parent.width();
            var slWidth = Math.floor(cWidth/3);
        }
        else{
            var svWidth = $('.sparkline-value', $parent).width();
            var cWidth = $parent.width();
            var slWidth = cWidth - svWidth - 20;
            var cHeight = $parent.parent().outerHeight() - 35;
            var svmHeight = $('.cf-svmc', $parent).height();
            var slHeight = cHeight - svmHeight;
            //$('.sparkline-value', $parent).css({height:slHeight});
        }    
    
        // Options
        sparkOptions.width = slWidth;
        sparkOptions.height = slHeight;        
        sparkOptions.height = 100;        
    
        // Create sparkline
        $obj.sparkline(data, sparkOptions);
    }
    
    // Call once on page load
    generateSparkline();
}


/*
*
*    Gauge (cf-gauge)
*
*/
$(document).ready(function(){
    //Initialise gauges to default 
    $('.cf-gauge').each(function(){

        // Gather IDs 
        var gId = $(this).prop('id');                    // Gauge container id e.g. cf-gauge-1
        var gcId = $('canvas', $(this)).prop('id');        // Gauge canvas id e.g. cf-gauge-1-g
        var gmId = $('.metric', $(this)).prop('id');      // Gauge metric id e.g. cf-gauge-1-m

        //Create a canvas
        var ratio = 2.1;
        var width = $('.canvas',$(this)).width();
        var height = Math.round(width/ratio);
        $('canvas', $(this)).prop('width', width).prop('height', height);

        // Set options      
        rGopts = {};
        rGopts.lineWidth = 0.30;
        rGopts.strokeColor = gaugeTrackColor;
        rGopts.limitMax = true;
        rGopts.colorStart = gaugeBarColor;
        rGopts.percentColors = void 0;    
        rGopts.pointer = {
            length: 0.7,
            strokeWidth: 0.035,
            color: gaugePointerColor
        };

        // Create gauge
        cf_rGs[gId] = new Gauge(document.getElementById(gcId)).setOptions(rGopts);
        cf_rGs[gId].setTextField(document.getElementById(gmId));

        // Set up values for gauge (in reality it'll likely be done one by one calling the function, not from here)
        var updateOpts = {'minVal':0, 'maxVal': 100, 'newVal': 0};
        gaugeUpdate(gId, updateOpts);

        // Responsiveness    
        $(window).resize(function(){
        
            //Get canvas measurements
            var ratio = 2.1;
            var width = $('.canvas', $('#'+gId)).width();
            var height = Math.round(width/ratio);

            cf_rGs[gId].ctx.clearRect(0, 0, width, height);
            $('canvas', $('#'+gId)).width(width).height(height);
            cf_rGs[gId].render();
        });

    });
});

/*
*    Set or update a Gauge
*    @param gauge     string         ID of gauge container
*    @param opts     object        JSON object of options
*/
function gaugeUpdate(gauge, opts){
    if(opts.minVal){
        $('.val-min .metric-small', $('#'+gauge)).html(opts.minVal);        
        cf_rGs[gauge].minValue = opts.minVal;
    }
    if(opts.maxVal){
        cf_rGs[gauge].maxValue = opts.maxVal;
        $('.val-max .metric-small', $('#'+gauge)).html(opts.maxVal);
    }
    if(opts.newVal){
        cf_rGs[gauge].set(parseInt(opts.newVal));
    }
}



function setPhValue(val) {
    var phScale = [
        ['#F23C25', '#FFFFFF'],
        ['#F23C25', '#FFFFFF'],
        ['#FF6600', '#FFFFFF'],
        ['#FFCC00', '#4A4A4A'],
        ['#CCFF00', '#4A4A4A'],
        ['#00AA00', '#FFFFFF'],
        ['#006633', '#FFFFFF'],
        ['#0033FF', '#FFFFFF'],
        ['#6600FF', '#FFFFFF'],
        ['#9900FF', '#FFFFFF'],
        ['#CC00CC', '#FFFFFF'],
        ['#CC0066', '#FFFFFF'],
        ['#FF0099', '#FFFFFF'],
        ['#FF00CC', '#FFFFFF'],
        ['#FF0033', '#FFFFFF'],
    ];
    var indx = Math.floor(val);
    //console.log(val, indx);
    //indx = Math.max(0, indx);
    //indx = Math.max(13, indx);
    var colors = phScale[indx];
    $('.cf-ph .color').css({
        backgroundColor: colors[0],
        color: colors[1]
    }).text(val);
    $('.cf-ph .value').css({
        color: colors[0]
    });
}

function setORPValue(val) {
    var ORPScale = [
        ['#F23C25', '#FFFFFF'],
        ['#F23C25', '#FFFFFF'],
        ['#FF6600', '#FFFFFF'],
        ['#FFCC00', '#4A4A4A'],
        ['#CCFF00', '#4A4A4A'],
        ['#00AA00', '#FFFFFF'],
        ['#006633', '#FFFFFF'],
        ['#0033FF', '#FFFFFF'],
        ['#6600FF', '#FFFFFF'],
        ['#9900FF', '#FFFFFF'],
        ['#CC00CC', '#FFFFFF'],
        ['#CC0066', '#FFFFFF'],
        ['#FF0099', '#FFFFFF'],
        ['#FF00CC', '#FFFFFF'],
        ['#FF0033', '#FFFFFF'],
    ];
    var indx = Math.floor(val/100);
    // console.log(val, indx);
    //indx = Math.max(0, indx);
    //indx = Math.max(13, indx);
    var colors = ORPScale[indx];
    $('.cf-orp .color').css({
       backgroundColor: colors[0],
       color: colors[1]
    }).text(val);
    $('.cf-orp .value').css({
       color: colors[0]
    });
}


/*
*
* pH
*
*/
$(document).ready(function(){
    var ph = 0;
    var orp = 0;
    setInterval(function(){
        ph = parseFloat((Math.random() * (7 - 5) + 5).toFixed(1));
        setPhValue(ph);
        orp = parseFloat((Math.random() * (600 - 400) + 400).toFixed(1));
        setORPValue(orp)
    }, 1000);
    
}); // end doc ready

/*
*
* Funnel charts
*
*/
$(document).ready(function(){
    /*
    *    Copy the each() function for each Funnel chart you have
    *     e.g. $('#cf-funnel-1').each(function(){.....}
    */                                

    $('.cf-funnel').each(function(){
    
        // Dummy data for Funnel chart
        funData = [3000,1500,500,250,10];
        funLabels = ['Visits','Cart','Checkout','Purchase','Refund'];
        funOptions = {barOpacity:true};
        
        cf_rFunnels[$(this).prop('id')] = new FunnelChart($(this).prop('id'), funData, funLabels, funOptions);
    });
    
}); // end doc ready



/*
*    Size modules 
*/
function cfSizeItems(){
    var width = $(window).width();

    /*$('.cf-item').each(function(){
        if(width > 767 ){
            $(this).height($(this).width());
        }
        else{
            $(this).height('auto');
        }
    });*/
}
// Call the resize function on window resize
$(window).resize(function(){
    cfSizeItems();
});

/*
*    Shorten large numbers
*/
function prettyNumber (number) {
    var prettyNumberSuffixes = ["", "K", "M", "bn", "tr"];
    var addCommas = function (nStr){
        var x = '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x)) {
            x = x.replace(rgx, '$1' + ',' + '$2');
        }
        return x;
    }
    var prettyNumber_rec = function (number, i) {
        if (i == prettyNumberSuffixes.length) {
            return addCommas(Math.round(number*1000)) + prettyNumberSuffixes[i-1];
        }
        if (number / 1000 >= 1) { // 1000+
            return prettyNumber_rec(number / 1000, ++i);
        }
        else {
            var decimals = number - Math.floor(number);
            if (decimals != 0) {
                if (number >= 10) { // 10 - 100
                    number = Math.floor(number) + Math.round(decimals*10) / 10 + '';
                    number = number.replace(/(.*\..).*$/, '$1');
                }
                else { // 0 - 10
                    number = Math.floor(number) + Math.round(decimals*100) / 100 + '';
                    number = number.replace(/(.*\...).*$/, '$1');
                }
                return number + prettyNumberSuffixes[i];
            }
            else {
                return Math.floor(number) + prettyNumberSuffixes[i];
            }
        }
    }
    return prettyNumber_rec(number, 0);
}





/*
*
* Socket IO
*
*/
$(document).ready(function(){
    socket.on('onDataRead', function (data) {
        //console.log(data);
        //$('#'+data.name).text(data.value);
        switch(data.name) {
            case 'relay1':
            case 'relay2':
            case 'relay3':
            case 'relay4':
            case 'relay5':
                var el = $('#'+data.name);
                el.removeClass('yn-y');
                var mEl = $('.metric', el);
                mEl.removeClass('m-red');
                mEl.removeClass('m-green');
                if(data.value == true) {
                    el.addClass('yn-y');
                    mEl.addClass('m-green');
                    mEl.text('On');
                } else {
                    mEl.addClass('m-red');
                    mEl.text('Off');
                }
            break;
            case 'trm1':
                var updateOpts = {'minVal':0, 'maxVal': 100, 'newVal': data.value};
                gaugeUpdate('cf-gauge-1', updateOpts);
                
                if(window.sparkData.trm1.length > 20) {
                    window.sparkData.trm1.shift();
                }
                window.sparkData.trm1.push(data.value);
                updateSparkline($('#spark-1'), window.sparkData.trm1, cf_defaultSparkOpts);
            break;
            case 'trm2':
                if(window.sparkData.trm2.length > 20) {
                    window.sparkData.trm2.shift();
                }
                window.sparkData.trm2.push(data.value);
                updateSparkline($('#spark-2'), window.sparkData.trm2, cf_defaultSparkOpts);
            break;
        }
    });
});