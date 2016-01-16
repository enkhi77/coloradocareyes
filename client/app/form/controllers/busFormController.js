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
            var sum1 = vm.form.premium +
                vm.form.worker * 0.59 +
                vm.form.admin;
            vm.healthexpense = sum1.toFixed(2);
            var sum2 = vm.form.payroll*0.067;
            vm.ccexpense = sum2.toFixed(2);
            var sum3 = vm.healthexpense - vm.ccexpense;
            vm.difference = sum3.toFixed(2);
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