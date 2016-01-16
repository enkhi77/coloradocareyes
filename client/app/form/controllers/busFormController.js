(function () {
    'use strict';
    angular
        .module('app.form')
        .controller('busFormController', busFormController);

    function busFormController() {
        console.log('load busFormController');
        var vm = this;

        vm.form1 = true;
        vm.nohelp = false;

        vm.form = {
            premium: null,
            worker: null,
            admin: null,
            payroll: null
        };

        vm.next = function next() {
            console.log('next!');
            vm.form1 = false;
            vm.healthexpense = vm.form.premium +
                vm.form.worker * 0.59 +
                vm.form.admin;
            vm.healthexpense.toFixed(2);
            vm.ccexpense = vm.form.payroll*0.067;
            vm.ccexpense.toFixed(2);
            vm.difference = vm.healthexpense - vm.ccexpense;
            vm.difference.toFixed(2);
        };

        vm.back = function back() {
            vm.form1 = true;
        };

        vm.clear = function clear() {
            vm.form = {
                premium: null,
                worker: null,
                admin: null,
                payroll: null
            };
        };
    }
})();