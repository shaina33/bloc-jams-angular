(function() {
    function CollectionCtrl(Fixtures, $rootScope) {
        this.albums = Fixtures.collection;
    }
    
    angular
        .module('blocJams')
        .controller('CollectionCtrl', ['Fixtures', CollectionCtrl]);
})();