(function() {
    function Metric($rootScope, Fixtures) {
        /**
        * @desc the metric object returned by the service
        * @type {Object}
        */
        var Metric = {};
        //$rootScope.metricData = {};
        $rootScope.metricData = [];
        
        /**
        * @desc Record date(in ms),album,artist,song in metricData
        * @param {Object} song
        */
        Metric.addEntry = function(song) {
            date = new Date();
            album = Fixtures.getAlbum();
            //$rootScope.metricData[date] = [album.title, album.artist, song.title];
            $rootScope.metricData.push( {
                date: date,
                album: album.title,
                artist: album.artist,
                song: song.title
            });
            /* logging for testing */
//            console.log('All entries so far...')
//            count = 0
//            for (entry in $rootScope.metricData) {
//                console.log($rootScope.metricData[entry].date+': '+$rootScope.metricData[entry].song);
//                count++
//            }
//            console.log('Total metric data entries: '+count);
        }
        
        return Metric;
    }

    angular
        .module('blocJams')
        .factory('Metric', ['$rootScope', 'Fixtures', Metric]);
})();