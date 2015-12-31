(function(){
    'use strict';

    angular
        .module('app.nav')
        .controller('footerController', footerController);

    function footerController(){
        console.log('load footerController');
        var vm = this;
    }
})();