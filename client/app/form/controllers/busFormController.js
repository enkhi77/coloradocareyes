(function(){
    'use strict';
    angular
        .module('app.form')
        .controller('busFormController', busFormController);

    function busFormController(){
        console.log('load busFormController');
        var vm = this;
    }
})();