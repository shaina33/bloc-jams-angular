var express = require('express');
var app = express();
app.use(express.static('public'));
app.listen(3000);

(function() {
    function config($stateProvider, $locationProvider) {
        $locationProvider
            .html5mode({
                enabled: true,
                requireBase: false
            });
        $stateProvider
            .state('landing', {
                url: '/',
                templateUrl: '/templates/landing.html'
            })
            .state('album', {
                url: '/album',
                templateUrl: 'templates/album.html'
            });
    }
    
    angular
        .module('blocJams', ['ui-router'])
        .config(config);
})();