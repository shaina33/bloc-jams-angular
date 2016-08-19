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
            scope: {
                onChange: '&'
            },
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
                * watch for updates to <seek-bar> attribute values
                */
                attributes.$observe('value', function(newValue) {
                    scope.value = newValue;
                });
                attributes.$observe('max', function(newValue) {
                    scope.max = newValue;
                });
                
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
                * @function notifyOnChange
                * @desc Call onChange using updated value
                * @param {Number} newValue
                */
                var notifyOnChange = function(newValue) {
                    if (typeof scope.onChange === 'function') {
                        scope.onChange({value: newValue});
                    }
                };
                
                /**
                * @function scope.fillStyle
                * @desc Prep for updating bar fill CSS
                * @return {Object}
                */
                scope.fillStyle = function() {
                    return {width: percentString()};
                };
                
                /**
                * @function scope.thumbStyle
                * @desc Prep for updating thumb position CSS
                * @return {Object}
                */
                scope.thumbStyle = function() {
                    return {left: percentString()};
                };
                
                /**
                * @function scope.onClickSeekBar
                * @desc On user click, update horizontal position value
                */
                scope.onClickSeekBar = function(event) {
                    var percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max;
                    notifyOnChange(scope.value);
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
                            notifyOnChange(scope.value);
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