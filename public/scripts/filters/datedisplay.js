(function() {
    function datedisplay() {
        return function(date) {
            output = date.toDateString()+' at '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
            return output;
        };
    }
    
    angular
        .module('blocJams')
        .filter('datedisplay', datedisplay);
})();