(function() {
    function MetricsCtrl($rootScope, $localStorage, Metric) {
        this.metricData = $rootScope.metricData;
        
        /* Song Pie Chart */
        
        /**
        * @function getSongpieData
        * @desc Prepares chart data from song counts
        * @parameter {Array of Objects} data
        */
        var getSongpieData = function(data) {
            var myData = data;
            var songData = $localStorage.songData || [];
            for (var entry in myData) {
                found = false;
                for (var song in songData) {
                    if (songData[song].key === myData[entry].song+', '+myData[entry].artist) {
                        songData[song].y ++;
                        found = true
                    }
                }
                if (found === false) {
                    songData.push( {
                        key: myData[entry].song+', '+myData[entry].artist,
                        y: 1
                    });
                }
            }
            $localStorage.songData = songData;
            return songData
        };
        
        this.resetData = function() {
            alert('Are you sure you want to reset all metrics data?');
            $localStorage.songData = [];
            $rootScope.metricData = [];
        }
        
        /**
        * @desc Holds data for song pie chart
        * @type {Array of Objects} Formatted for angular-nvd3
        */
        this.songpieData = getSongpieData($rootScope.metricData);
        
        /**
        * @desc Holds chart options for song pie chart
        * @type {Object} Formatted for angular-nvd3
        */
        this.songpieOptions = {
            chart: {
                type: 'pieChart',
                height: 500,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: false,
                duration: 500,
                labelThreshold: 0.10,
                labelSunbeamLayout: false,
                legendPosition: 'right',
                legend: {
                    margin: {
                        top: 30,
                        right: 70,
                        bottom: 5,
                        left: 0
                    },
                    align: true,
                    maxKeyLength: 50
                },
                pie: {
                    growOnHover: true
                },
                styles: {
                    css: {
                        color: 'white'
                    }
                }
            },
            title: {
                    enable: true,
                    text: 'Most Popular Songs',
                    className: 'h3'
            }
        };
    }
    
    angular
        .module('blocJams')
        .controller('MetricsCtrl', MetricsCtrl);
})();