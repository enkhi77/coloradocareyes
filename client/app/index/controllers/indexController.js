(function(){
    'use strict';
    angular
        .module('app')
        .controller('indexController', indexController);

    indexController.$inject = ['$state'];

    function indexController($state){
        console.log('Load indexController', $state.current.name);
        var vm = this;
    }
})();