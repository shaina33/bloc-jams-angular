(function() {
    function seekBar($document) {
        var calculatePercent = function(seekBar, event) {
            var offsetX = event.pageX - seekBar.offset().left;
            var seekBarWidth = seekBar.width();
            var offsetXPercent = offsetX / seekBarWidth;
            offsetXPercent = Math.max(0, offsetXPercent);
            offsetXPercent = Math.min(1, offsetXPercent);
            return offsetXPercent;
        };
        
        return {
            templateUrl: '/templates/directives/seek_bar.html',
            replace: true,
            restrict: 'E',
            scope: { },
            link: function(scope, element, attributes) {
                /**
                * @desc Horizontal position value
                * @type {Number} default 0
                */
                scope.value = 0;
                
                /**
                * @desc Horizontal position maximum
                * @type {Number} default 100
                */
                scope.max = 100;
                
                /**
                * @desc Holds the <seek-bar> element
                * @type {jQuery}
                */
                var seekBar = $(element);
                
                /**
                * @function percentString
                * @desc Calculate percentage of horizontal position value
                * @return {String}
                */
                var percentString = function() {
                    var value = scope.value;
                    var max = scope.max;
                    var percent = value / max * 100;
                    return percent + "%";
                };
                
                /**
                * @function scope.fillStyle
                * @desc Prep for updating bar fill CSS
                * @return {String}
                */
                scope.fillStyle = function() {
                    return {width: percentString()};
                };
                
                /**
                * @function scope.onClickSeekBar
                * @desc On user click, update horizontal position value
                */
                scope.onClickSeekBar = function(event) {
                    var percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max;
                };
                
                /**
                * @function scope.trackThumb
                * @desc As user drags thumb, update horizontal position value
                */
                scope.trackThumb = function() {
                    $document.bind('mousemove.thumb', function(event) {
                        var percent = calculatePercent(seekBar, event);
                        scope.$apply(function() {
                            scope.value = percent * scope.max;
                        });
                    });
                    $document.bind('mouseup.thumb', function() {
                        $document.unbind('mousemove.thumb');
                        $document.unbind('mouseup.thumb');
                    });
                };
            }
        };
    }
    
    angular
        .module('blocJams')
        .directive('seekBar', ['$document', seekBar]);
})();