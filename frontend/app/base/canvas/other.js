define([
    'angular',
    'app',
    'figure'
], function (angular, app) {
    'use strict';

    function pHBarrel() {

    }

    pHBarrel.prototype = new app.Figure();

    app.pHBarrel = pHBarrel;
});