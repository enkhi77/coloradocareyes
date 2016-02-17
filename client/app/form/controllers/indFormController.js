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
                    applicableSS: null,
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
                    applicableSS: null,
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
            var results = vm.form.premium * 12 + vm.form.deductible + vm.form.copay + vm.form.expenses;
            console.log('baseCalculation return', results);
            return results;
        };
        var singleCalculation = function singleCalculation(){
            vm.results.you.annualSS = vm.form.you.monthlySS * 12;
            console.log('singleCalculation annualSS', vm.results.you.annualSS);
            vm.results.you.applicableSS = vm.results.you.annualSS - 9000;
            if(vm.results.you.applicableSS < 0){
                vm.results.you.applicableSS = 0;
            }
            console.log('singleCalculation applicableSS', vm.results.you.applicableSS);
            if(vm.form.you.age1){
                vm.results.you.applicableRet = vm.results.you.applicableSS + vm.form.you.retirement - 20000;
                if(vm.results.you.applicableRet < 0){
                    vm.results.you.applicableRet = 0;
                }
                console.log('singleCalculation over 55 applicableRet', vm.results.you.applicableRet);
            }
            else{
                vm.results.you.applicableRet = vm.results.you.applicableSS + vm.form.you.retirement;
                console.log('singleCalculation under 55 applicableRet', vm.results.you.applicableRet);
                return vm.results.you.applicableRet;
            }
            if(vm.form.you.age2){
                console.log('age check over 65');
                vm.results.you.postApplicableRet = vm.results.you.applicableRet - 4000;
                if(vm.results.you.postApplicableRet < 0){
                    vm.results.you.postApplicableRet = 0;
                }
                vm.results.you.SSRetirementIncome = vm.results.you.applicableSS + vm.results.you.postApplicableRet;
                vm.results.you.calcRetirement = vm.results.you.SSRetirementIncome;
                console.log('over 65 returning', vm.results.you.calcRetirement);
                return vm.results.you.calcRetirement;
            }
            else{
                console.log('age check not over 65');
                vm.results.you.calcRetirement = vm.results.you.applicableRet + vm.results.you.applicableSS;
                console.log('over 55 under 65 returning', vm.results.you.calcRetirement);
                return vm.results.you.calcRetirement;
            }
        };
        var jointCalculation = function jointCalculation(){
            // first calculation for you
            vm.results.you.annualSS = vm.form.you.monthlySS * 12;
            console.log('jointCalculation you annualSS', vm.results.you.annualSS);
            vm.results.you.applicableSS = vm.results.you.annualSS - 9000;
            if(vm.results.you.applicableSS < 0){
                vm.results.you.applicableSS = 0;
            }
            console.log('jointCalculation you applicableSS', vm.results.you.applicableSS);
            if(vm.form.you.age1){
                vm.results.you.applicableRet = vm.results.you.applicableSS + vm.form.you.retirement - 20000;
                if(vm.results.you.applicableRet < 0){
                    vm.results.you.applicableRet = 0;
                }
                console.log('jointCalculation you over 55 applicableRet', vm.results.you.applicableRet);
            }
            else{
                vm.results.you.applicableRet = vm.results.you.applicableSS + vm.form.you.retirement;
                if(!vm.form.you.age2){
                    vm.results.you.calcRetirement = vm.results.you.applicableRet;
                }
                console.log('jointCalculation you under 55 applicableRet', vm.results.you.applicableRet);
            }
            if(vm.form.you.age2){
                console.log('age check you over 65');
                vm.results.you.postApplicableRet = vm.results.you.applicableRet - 4000;
                if(vm.results.you.postApplicableRet < 0){
                    vm.results.you.postApplicableRet = 0;
                }
                vm.results.you.SSRetirementIncome = vm.results.you.applicableSS + vm.results.you.postApplicableRet;
                vm.results.you.calcRetirement = vm.results.you.SSRetirementIncome;
                console.log('you over 65 returning', vm.results.you.calcRetirement);
            }
            else{
                console.log('age check not over 65');
                vm.results.you.calcRetirement = vm.results.you.applicableRet + vm.results.you.applicableSS;
                console.log('you over 55 under 65 returning', vm.results.you.calcRetirement);
            }

            // second calculation for spouse
            vm.results.spouse.annualSS = vm.form.spouse.monthlySS * 12;
            console.log('singleCalculation annualSS', vm.results.spouse.annualSS);
            vm.results.spouse.applicableSS = vm.results.spouse.annualSS - 9000;
            if(vm.results.spouse.applicableSS < 0){
                vm.results.spouse.applicableSS = 0;
            }
            console.log('singleCalculation applicableSS', vm.results.spouse.applicableSS);
            if(vm.form.spouse.age1){
                vm.results.spouse.applicableRet = vm.results.spouse.applicableSS + vm.form.spouse.retirement - 20000;
                if(vm.results.spouse.applicableRet < 0){
                    vm.results.spouse.applicableRet = 0;
                }
                console.log('singleCalculation over 55 applicableRet', vm.results.spouse.applicableRet);
            }
            else{
                vm.results.spouse.applicableRet = vm.results.spouse.applicableSS + vm.form.spouse.retirement;
                if(!vm.form.spouse.age2){
                    vm.results.spouse.calcRetirement = vm.results.spouse.applicableRet;
                }
                console.log('singleCalculation under 55 applicableRet', vm.results.spouse.applicableRet);
            }
            if(vm.form.spouse.age2){
                console.log('age check over 65');
                vm.results.spouse.postApplicableRet = vm.results.spouse.applicableRet - 4000;
                if(vm.results.spouse.postApplicableRet < 0){
                    vm.results.spouse.postApplicableRet = 0;
                }
                vm.results.spouse.SSRetirementIncome = vm.results.spouse.applicableSS + vm.results.spouse.postApplicableRet;
                vm.results.spouse.calcRetirement = vm.results.spouse.SSRetirementIncome;
                console.log('over 65 returning', vm.results.spouse.calcRetirement);
            }
            else{
                console.log('age check not over 65');
                vm.results.spouse.calcRetirement = vm.results.spouse.applicableRet + vm.results.spouse.applicableSS;
                console.log('over 55 under 65 returning', vm.results.spouse.calcRetirement);
            }
            var jointResults = vm.results.you.calcRetirement + vm.results.spouse.calcRetirement;
            console.log('Joint results', jointResults);
            return jointResults;
        };


        vm.calculate = function calculate() {
            console.log('Running individual calculation');
            vm.resultsShown = true;
            var sum1 = baseCalculation();
            vm.result1 = sum1.toFixed(2);

            var sum2 = null;
            if(vm.other && !vm.social){
                sum2 = (vm.form.income * 0.0333) + (0.10 * vm.form.gross);
                console.log('vm.other && !vm.social baseCalculation', sum1);
                vm.result2 = sum2.toFixed(2);
            }
            else if(vm.other && vm.social && vm.filing === 'single'){
                sum2 = (vm.form.income * 0.0333) + (0.10 * vm.form.gross) + singleCalculation();
                console.log('vm.other && vm.social &&vm.filing single baseCalculation', sum1);
                vm.result2 = sum2.toFixed(2);
            }
            else if(vm.other && vm.social && vm.filing === 'joint'){
                sum2 = (vm.form.income * 0.0333) + (0.10 * vm.form.gross) + jointCalculation();
                console.log('vm.other && vm.social &&vm.filing joint baseCalculation', sum1);
                vm.result2 = sum2.toFixed(2);
            }

            var sum3 = vm.result1 - vm.result2;
            vm.difference = sum3.toFixed(2);
        };

        vm.clear = function clear() {
            setIndividualForm();
        };


    }
})();