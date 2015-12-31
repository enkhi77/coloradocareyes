(function(){
    'use strict';
    angular
        .module('app.form')
        .controller('indFormController', indFormController);

    function indFormController(){
        console.log('load indFormController');
        var vm = this;
    }
})();