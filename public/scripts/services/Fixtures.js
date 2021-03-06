(function() {
    function Fixtures($rootScope) {
        var Fixtures = {};
        Fixtures.getAlbum = function() {
            index = $rootScope.albumID || 0;
            return Fixtures.collection[index];
        };
        
        // Seed Data for collection of albums //
        var albumPicasso = {
             title: 'The Colors',
             artist: 'Pablo Picasso',
             label: 'Cubism',
             year: '1881',
             albumArtUrl: '/assets/images/album_covers/01.png',
             songs: [
                 { title: 'Blue', duration: 161.71, audioURL: 'assets/music/blue' },
                 { title: 'Green', duration: 103.96, audioURL: 'assets/music/green' },
                 { title: 'Red', duration: 268.45, audioURL: 'assets/music/red' },
                 { title: 'Pink', duration: 153.14, audioURL: 'assets/music/pink' },
                 { title: 'Magenta', duration: 374.22, audioURL: 'assets/music/magenta' }
             ]
        };
        var albumMarconi = {
             title: 'The Telephone',
             artist: 'Guglielmo Marconi',
             label: 'EM',
             year: '1909',
             albumArtUrl: '/assets/images/album_covers/20.png',
             songs: [
                 { title: 'Hello, Operator?', duration: 61, audioURL: 'assets/music/green' },
                 { title: 'Ring, ring, ring', duration: 301, audioURL: 'assets/music/green' },
                 { title: 'Fits in your pocket', duration: 201, audioURL: 'assets/music/green'},
                 { title: 'Can you hear me now?', duration: 194, audioURL: 'assets/music/green' },
                 { title: 'Wrong phone number', duration: 135, audioURL: 'assets/music/green'}
             ]
         };
        var makeCollection = function(numberOfAlbums) {
            var collection = [];
            for (var i=0; i<numberOfAlbums; i++) {
                collection.push(angular.copy(albumPicasso));
                collection.push(angular.copy(albumMarconi));
            }
            return collection;
        };
        Fixtures.collection = makeCollection(8)
        
        return Fixtures;
    }
    
    angular
        .module('blocJams')
        .factory('Fixtures', Fixtures);
})();