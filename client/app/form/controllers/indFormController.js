(function(){
    'use strict';
    angular
        .module('app.form')
        .controller('indFormController', indFormController);

    function indFormController(){
        console.log('load indFormController');
        var vm = this;

        vm.form1 = true;
        vm.form2 = false;

        vm.form = {
            premium: 0,
            deductible: 0,
            copay: 0,
            yearly: 0,
            expenses: 0,
            income: 0
        };
        vm.other = null;

        vm.second = {
            one: 0,
            two: 0
        };

        vm.next = function next(){
            if(vm.other){
                vm.form1 = false;
                vm.form2 = true;
                vm.other = null;
            }
            else{
                console.log('check form', vm.form);
                vm.form1 = false;
                vm.form2 = false;
                vm.result1 = vm.form.premium + vm.form.deductible + vm.form.copay + vm.form.yearly + vm.form.expenses;
                vm.result2 = vm.form.income * 0.0333;
                vm.difference = vm.result1 - vm.result2;
            }
        };
    }
})();