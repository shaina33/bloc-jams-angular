(function() {
    function datedisplay() {
        return function(date) {
            //output = date.toDateString()+' at '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
            output = moment(date).format('MMMM Do YYYY, h:mm:ss a')
            return output;
        };
    }
    
    angular
        .module('blocJams')
        .filter('datedisplay', datedisplay);
})();