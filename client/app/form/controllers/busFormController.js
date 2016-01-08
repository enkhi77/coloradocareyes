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

        vm.next = function next(){
            console.log('next!');
            vm.form1 = false;
        };
        vm.finish = function finish(){
            console.log('finish!');
            vm.form2 = true;
            vm.healthexpense = vm.form.premium + vm.form.sole + vm.form.worker*0.59 + vm.form.vehicle + vm.form.admin;
            console.log('healthexpense total', vm.healthexpense);
            vm.ccexpense = vm.form.payroll + vm.form.employee*0.0333;
            console.log('ccexpense total', vm.ccexpense);
            vm.difference = vm.form.healthexpense - vm.form.ccexpense;
            console.log('difference', vm.difference);
        };
    }
})();