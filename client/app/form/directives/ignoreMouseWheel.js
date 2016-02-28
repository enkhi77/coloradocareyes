(function(){
    'use strict';
    angular
        .module('app.form')
        .directive('ignoreMouseWheel', ignoreMouseWheel);

    function ignoreMouseWheel() {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    console.log('ignore mousewheel');
                    element.bind('mousewheel', function (event) {
                        element.blur();
                    });
                }
            };
        }
})();
