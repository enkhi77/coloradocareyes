(function(){
    'use strict';
    angular
        .module('app.form')
        .controller('busFormController', busFormController);

    function busFormController(){
        console.log('load busFormController');
        var vm = this;

        vm.form1 = true;
        vm.form2 = false;

        vm.form = {
            premium: 0,
            sole: 0,
            worker: 0,
            vehicle: 0,
            admin: 0,
            payroll: 0,
            employee: 0
        };
    }
})();