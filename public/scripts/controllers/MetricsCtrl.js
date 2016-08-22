(function() {
    function MetricsCtrl($rootScope, Metric) {
        this.metricData = $rootScope.metricData;
    }
    
    angular
        .module('blocJams')
        .controller('MetricsCtrl', ['Metric', '$rootScope', MetricsCtrl]);
})();