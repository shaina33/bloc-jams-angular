(function() {
    function MetricsCtrl($scope, $rootScope, $localStorage, Metric) {
        this.metricData = $rootScope.metricData;
        
        /* Song Pie Chart */
        
        /**
        * @function getSongpieData
        * @desc Prepares chart data from song counts
        * @parameter {Array of Objects} data
        */
        var getSongpieData = function(data) {
            //console.log('data received is: '+data);
//            if (data === []) {
//                return [];
//            }
            var myData = data;
            var songData = $localStorage.songData || [];
            for (var entry in myData) {
                found = false;
                for (var song in songData) {
                    if (songData[song].key === myData[entry].song+' - '+myData[entry].artist) {
                        songData[song].y ++;
                        found = true
                    }
                }
                if (found === false) {
                    songData.push( {
                        key: myData[entry].song+' - '+myData[entry].artist,
                        y: 1
                    });
                }
            }
            $localStorage.songData = songData;
            return songData
        };
        
        this.resetData = function() {
            if (confirm('This action will reset all metrics data!')) {
                //$scope.$apply(function() {
                    $localStorage.songData = [];
                    $rootScope.metricData = [];
                    this.songpieData = [];
                //})
            }
            //$scope.$apply();
        };
        
        /**
        * @desc Holds data for song pie chart
        * @type {Array of Objects} Formatted for angular-nvd3
        */
        this.songpieData = getSongpieData($rootScope.metricData);
        //$scope.$watch($rootScope.metricData, updateSongpieData);
        
//        var updateSongpieData = function(data) {
//            console.log('updating');
//            this.songpieData = getSongpieData(data);
//        };
        
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
                valueFormat: (function(d) {
                    return d;
                    }),
                legendPosition: 'top',
                legend: { //30,70,5,0
                    margin: {
                        top: 10,
                        right: 30,
                        bottom: 10,
                        left: 50
                    },
                    align: true,
                    rightAlign: false,
                    maxKeyLength: 50
                },
                pie: {
                    growOnHover: true,
                    labelType: 'key'
                },
                tooltip: {
                    keyFormatter: (function(d) {
                        return d+': ';
                    })
                },
                styles: {
                    css: {
                        color: 'white'
                    }
                }
//                margin: {
//                    left: 50,
//                    right: 50
//                }
            },
            title: {
                    enable: false,
                    text: 'Your Most Played Songs',
                    className: 'h2'
            }
        }
    }
    
    angular
        .module('blocJams')
        .controller('MetricsCtrl', MetricsCtrl);
})();