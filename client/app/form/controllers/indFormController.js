(function () {
    'use strict';
    angular
        .module('app.form')
        .controller('indFormController', indFormController);

    function indFormController() {
        console.log('load indFormController');
        var vm = this;

        function setIndividualForm(){
            vm.resultsShown = null;
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
            vm.results = {
                you: {
                    annualSS: null,
                    applicableRet: null,
                    postApplicableRet: null,
                    SSRetirementIncome: null,
                    calcRetirement: null,
                    healthcareCost: null,
                    CCCost: null,
                    savings: null
                },
                spouse: {
                    annualSS: null,
                    applicableRet: null,
                    postApplicableRet: null,
                    SSRetirementIncome: null,
                    calcRetirement: null,
                    healthcareCost: null,
                    CCCost: null,
                    savings: null
                }

            };
            vm.result1 = null;
            vm.result2 = null;
            vm.result3 = null;
            vm.resultFiling = null;
        }
        setIndividualForm();

        var baseCalculation = function baseCalculation(){
            var sum1 = vm.form.premium * 12 +
                vm.form.deductible +
                vm.form.copay +
                vm.form.expenses;
            vm.result1 = sum1.toFixed(2);
        };
        var singleCalculation = function singleCalculation(){
            if(vm.form.you.age1){
                console.log('age check over 55');
                vm.results.you.applicableRet = vm.results.you.applicableSS + vm.form.you.retirement - 20000;
                if(vm.form.you.age2){
                    console.log('age check over 65');
                    vm.results.you.postApplicableRet = vm.results.you.applicableRet - 4000;
                    vm.results.you.SSRetirementIncome = vm.results.you.applicableSS + vm.results.you.postApplicableRet;
                    vm.results.you.calcRetirement = vm.results.you.SSRetirementIncome;
                }
                else{
                    console.log('age check not over 65');
                    vm.results.you.calcRetirement = vm.results.you.applicableRet + vm.results.you.applicableSS;
                }
            }
            else{
                console.log('age check not over 55');
                vm.results.you.calcRetirement = vm.results.you.applicableSS + vm.form.you.retirement;
            }
        };
        var jointCalculation = function jointCalculation(){
            if(vm.form.you.age1){
                if(vm.form.you.age2){
                    console.log('joint you age check over 55');
                    vm.results.you.applicableRet = vm.results.you.applicableSS + vm.form.you.retirement - 20000;
                }
                else{
                    console.log('age check not over 65');
                    vm.results.you.calcRetirement = vm.results.you.applicableRet + vm.results.you.applicableSS;
                }
            }
            else{
                console.log('age check not over 55');
                vm.results.you.calcRetirement = vm.results.you.applicableSS + vm.form.you.retirement;
            }
            if(vm.form.spouse.age1){
                console.log('joint spouse age check over 55');
                vm.results.spouse.applicableRet = vm.results.spouse.applicableSS + vm.form.you.retirement - 20000;
                if(vm.form.spouse.age2){
                    console.log('age check over 65');
                    vm.results.spouse.postApplicableRet = vm.results.spouse.applicableRet - 4000;
                    vm.results.spouse.SSRetirementIncome = vm.results.spouse.applicableSS + vm.results.spouse.postApplicableRet;
                    vm.results.spouse.calcRetirement = vm.results.spouse.SSRetirementIncome;
                }
                else{
                    console.log('age check not over 65');
                    vm.results.spouse.calcRetirement = vm.results.spouse.applicableRet + vm.results.spouse.applicableSS;
                }
            }
            else{
                console.log('age check not over 55');
                vm.results.spouse.calcRetirement = vm.results.spouse.applicableSS + vm.form.spouse.retirement;
            }
        };
        var over55Calculation = function over55Calculation(applicableSS, retirement){

        };
        var over65Calculation = function over65Calculation(){

        };

        vm.calculate = function calculate() {
            vm.resultsShown = true;
            var sum1 = baseCalculation();
            vm.result1 = sum1.toFixed(2);

            var sum2 = vm.form.income * 0.0333;
            vm.result2 = sum2.toFixed(2);

            var sum3 = vm.result1 + vm.resultFiling - vm.result2;
            vm.difference = sum3.toFixed(2);
        };

        vm.clear = function clear() {
            setIndividualForm();
        };


    }
})();