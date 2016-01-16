(function () {
    'use strict';
    angular
        .module('app.form')
        .controller('indFormController', indFormController);

    function indFormController() {
        console.log('load indFormController');
        var vm = this;

        vm.form1 = true;

        vm.form = {
            premium: null,
            deductible: null,
            copay: null,
            expenses: null,
            income: null
        };
        vm.other = null;

        vm.next = function next() {
            console.log('check form', vm.form);
            vm.form1 = false;
            vm.result1 = vm.form.premium * 12 +
                vm.form.deductible +
                vm.form.copay +
                vm.form.expenses;
            vm.result1.toFixed(2);
            vm.result2 = vm.form.income * 0.0333;
            vm.result2.toFixed(2);
            vm.difference = vm.result1 - vm.result2;
            vm.difference.toFixed(2);
        };

        vm.back = function back() {
            vm.form1 = true;
        };

        vm.clear = function clear() {
            vm.form = {
                premium: null,
                deductible: null,
                copay: null,
                expenses: null,
                income: null
            };
            vm.other = null;
        };
    }
})();