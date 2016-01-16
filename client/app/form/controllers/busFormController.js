(function(){
    'use strict';
    angular
        .module('app.form')
        .controller('busFormController', busFormController);

    function busFormController(){
        console.log('load busFormController');
        var vm = this;

        function setBusinessForm() {
            vm.form = {
                premium: null,
                worker: null,
                admin: null,
                payroll: null
            };
        }
        setBusinessForm();

        vm.calculate = function calculate(){
            console.log('next!');
            vm.form1 = false;

            var sum1 = vm.form.premium + vm.form.worker*0.59 + vm.form.admin;
            vm.healthexpense = sum1.toFixed(2);

            var sum2 = vm.form.payroll*0.067;
            vm.ccexpense = sum2.toFixed(2);

            var sum3 = vm.healthexpense - vm.ccexpense;
            vm.difference = sum3.toFixed(2);
        };

        vm.clear = function clear(){
            setBusinessForm();
            vm.calculate();
        };
    }
})();