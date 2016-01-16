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
        vm.nohelp = false;

        vm.next = function next() {
            console.log('check form', vm.form);
            vm.form1 = false;
            var sum1 = vm.form.premium * 12 +
                vm.form.deductible +
                vm.form.copay +
                vm.form.expenses;
            vm.result1 = sum1.toFixed(2);
            var sum2 = vm.form.income * 0.0333;
            vm.result2 = sum2.toFixed(2);
            var sum3 = vm.result1 - vm.result2;
            vm.difference = sum3.toFixed(2);
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

        vm.startover = function startover(){
            vm.form1 = true;
            vm.form = {
                premium: null,
                deductible: null,
                copay: null,
                expenses: null,
                income: null
            };
            vm.other = null;
        }
    }
})();