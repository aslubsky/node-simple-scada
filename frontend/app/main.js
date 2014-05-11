define([
    'app', 'views',
    'base/module'
], function(app) {
    angular.bootstrap(document.documentElement, [app.name]);
});