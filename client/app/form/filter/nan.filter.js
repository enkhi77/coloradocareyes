(function () {
    'use strict';
    angular.module('app.form')
        .filter('nanFilter', nanFilter);
    function nanFilter(){
        return function(input){
            console.log('nanFilter input', input);
            return input;
        };
    }
})();