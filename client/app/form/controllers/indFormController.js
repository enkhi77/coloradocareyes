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
            vm.results = {
                annualSS: null,
                applicableRet: null,
                postApplicableRet: null,
                SSRetirementIncome: null,
                calcRetirement: null,
                healthcareCost: null,
                CCCost: null,
                savings: null
            };
        }
        setIndividualForm();

        vm.calculate = function calculate() {
            console.log('check form', vm.form);
            vm.results.annualSS = 12 * vm.form.you.monthlySS;
            vm.results.applicableSS = vm.results.annualSS - 9000;
            if(vm.filing === 'single'){
                if(vm.form.you.age1){
                    console.log('age check over 55');
                    vm.results.applicableRet = vm.results.applicableSS + vm.form.you.retirement - 20000;
                    if(vm.form.you.age2){
                        console.log('age check over 65');
                        vm.results.postApplicableRet = vm.results.applicableRet - 4000;
                        vm.results.SSRetirementIncome = vm.results.applicableSS + vm.postApplicableRet;
                        vm.results.calcRetirement = vm.results.SSRetirementIncome;
                    }
                    else{
                        console.log('age check not over 65');
                        vm.results.calcRetirement = vm.results.applicableRet + vm.results.applicableSS;
                    }
                }
                else{
                    console.log('age check not over 55');
                    vm.results.calcRetirement = vm.results.applicableSS + vm.form.you.retirement;
                }
            }
            console.log('check results', vm.results);
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