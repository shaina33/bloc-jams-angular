(function() {
    function SongPlayer($rootScope, Fixtures, Metric) {
        /**
        * @desc the SongPlayer returned by the service
        * @type {Object}
        */
        var SongPlayer = {};
        
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;
        
        /**
        * @function setSong
        * @desc Stops currently playing song & loads new audio file
        * @param {Object} song
        */
        var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong(SongPlayer.currentSong);
            }
            currentBuzzObject = new buzz.sound(song.audioURL, {
                formats: ['mp3'],
                preload: true
            });
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });
            SongPlayer.currentSong = song;
            Metric.addEntry(song);
        };
        
        /**
        * @function playSong
        * @desc Play a song
        * @param {Object} song
        */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };
        
        /**
        * @function stopSong
        * @desc Stop playing a song
        * @param {Object} song
        */
        var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
        };
        
        /**
        * @function getSongIndex
        * @desc gets index of a song from the current album
        * @param {Object} song
        */
        var getSongIndex = function(song) {
            return Fixtures.getAlbum().songs.indexOf(song);
        };
        
        /**
        * @desc Currently playing song, from the album's list of songs
        * @type {Object}
        */
        SongPlayer.currentSong = null;
        
        /**
        * @desc Current playback time (in sec) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;
        
        /**
        * @desc Current volume level (default 30)
        * @type {Number}
        */
        SongPlayer.volume = 30;
        
        /**
        * @function SongPlayer.play
        * @desc Set & Play a new, or currently paused, song
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };
        
        /** 
        * @function SongPlayer.pause
        * @desc Pause the currently playing song
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        /**
        * @function SongPlayer.previous
        * @desc Play the previous song on the album
        */
        SongPlayer.previous = function(){
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                stopSong(SongPlayer.currentSong);
            } else {
                //var song = currentAlbum.songs[currentSongIndex];
                var song = Fixtures.getAlbum().songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        /**
        * @function SongPlayer.next
        * @desc Play the next song on the album
        */
        SongPlayer.next = function(){
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            var currentSongList = Fixtures.getAlbum().songs;
            
            if (currentSongIndex === currentSongList.length) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentSongList[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        /**
        * @function SongPlayer.setCurrentTime
        * @desc Set playback time (in sec) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);            
            }
        };
        
        /**
        * @function SongPlayer.setVolume
        * @desc Set volume level (0-100)
        * @param {Number} volume
        */
        SongPlayer.setVolume = function(volume) {
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
            }
        };
        
        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', 'Metric', SongPlayer]);
})();