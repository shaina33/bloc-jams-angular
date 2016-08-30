(function() {
    function AlbumCtrl(Fixtures, SongPlayer, $rootScope) {
        this.albumData = Fixtures.getAlbum();
        this.songPlayer = SongPlayer;
    }
    
    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', '$rootScope', AlbumCtrl]);
})();