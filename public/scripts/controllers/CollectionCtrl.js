(function() {
    function CollectionCtrl(Fixtures, $rootScope) {
//        this.albums = [];
//        for (var i=0; i<12; i++) {
//            this.albums.push(angular.copy(albumPicasso));
//        }
        this.albums = Fixtures.getCollection();
    }
    
    angular
        .module('blocJams')
        .controller('CollectionCtrl', ['Fixtures', CollectionCtrl]);
})();