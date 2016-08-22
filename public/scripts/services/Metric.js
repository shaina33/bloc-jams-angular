(function() {
    function Metric($rootScope, Fixtures) {
        /**
        * @desc the metric object returned by the service
        * @type {Object}
        */
        var Metric = {};
        $rootScope.metricData = {};
        
        /**
        * @desc Record date(in ms),album,artist,song in metricData
        * @param {Object} song
        */
        Metric.addEntry = function(song) {
            date = new Date();
            album = Fixtures.getAlbum();
            $rootScope.metricData[date] = [album.title, album.artist, song.title];
            console.log(date);
            console.log($rootScope.metricData[date]);
        }
        
        return Metric;
    }

    angular
        .module('blocJams')
        .factory('Metric', ['$rootScope', 'Fixtures', Metric]);
})();