(function() {    
    function PlayerBarCtrl(Fixtures, SongPlayer, $rootScope) {
        if ($rootScope.albumID) {
            this.albumData = Fixtures.getAlbum();
        }
        this.songPlayer = SongPlayer;
    }

    angular
        .module('blocJams')
        .controller('PlayerBarCtrl', PlayerBarCtrl);
})();