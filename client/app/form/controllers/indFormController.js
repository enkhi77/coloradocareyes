(function () {
    'use strict';
    angular
        .module('app.form')
        .controller('indFormController', indFormController);

    function indFormController() {
        console.log('load indFormController');
        var vm = this;

        function setIndividualForm(){
            vm.form = {
                premium: null,
                deductible: null,
                copay: null,
                expenses: null,
                income: null,
                SS: null,
                gross: null,
                you:{
                    receiveSS: null,
                    monthlySS: null,
                    retirement: null,
                    age1: null,
                    age2: null
                },
                spouse: {
                    receiveSS: null,
                    monthlySS: null,
                    retirement: null,
                    age1: null,
                    age2: null
                }
            };
            vm.other = null;
            vm.social = null;
            vm.medicaid = null;
            vm.medicare = null;
            vm.filing = null;
            vm.age1 = null;
        }
        setIndividualForm();


        vm.calculate = function calculate() {
            console.log('check form', vm.form);
            var ssAnnual = vm.SS * 12;
            var ssFinal = function(){
                if(ssAnnual - 9000 < 0){
                    return 0;
                }
                else{
                    return ssAnnual - 9000;
                }
            };
            var sum1 = vm.form.premium * 12 +
                vm.form.deductible +
                vm.form.copay +
                vm.form.expenses;
            vm.result1 = sum1.toFixed(2);

            var sum2 = vm.form.income * 0.0333;
            vm.result2 = sum2.toFixed(2);

            var sum3 = vm.result1 - vm.result2;
            vm.difference = sum3.toFixed(2)
        };

        vm.clear = function clear() {
            setIndividualForm();
            vm.calculate();
        };
    }
})();