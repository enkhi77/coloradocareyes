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
                },
                joint: {
                    applicableSS: null,
                    SSRetirementIncome: null
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
        var over55Calculation = function over55Calculation(a, b, c){
            var sum = (0.10 * (a - ((12 * b) - 9000 + c) + ((12 * b) - 9000 + c) - 20000));
            if(sum < 0){
                sum = 0;
            }
            console.log('check over55 calculation', sum);
            return sum;
        };
        var over65Calculation = function over65Calculation(a, b, c){
            var sum = (0.10 * (a - ((12 * b) - 9000 + c) + ((12 * b) - 9000 + c) - 24000));
            if(sum < 0){
                sum = 0;
            }
            console.log('check over65 calculation', sum);
            return sum;
        };
        var singleCalculation = function singleCalculation(){
            if(vm.other && vm.social && vm.form.you.age1 && !vm.form.you.age2){
                return (vm.form.income * 0.0333) + over55Calculation(vm.form.gross, vm.form.you.monthlySS, vm.form.you.retirement);
            }
            else if(vm.other && vm.social && vm.form.you.age1 && vm.form.you.age2){
                return (vm.form.income * 0.0333) + over65Calculation(vm.form.gross, vm.form.you.monthlySS, vm.form.you.retirement);
            }
        };
        var jointCalculation = function jointCalculation(){
            var sumYou = null;
            var sumSpouse = null;
            var sumAll = null;
            if(vm.other && vm.social && vm.form.you.age1 && !vm.form.you.age2){
                sumYou = (vm.form.income * 0.0333) + over55Calculation(vm.form.gross, vm.form.you.monthlySS, vm.form.you.retirement);
            }
            else if(vm.other && vm.social && vm.form.you.age1 && vm.form.you.age2){
                sumYou =  (vm.form.income * 0.0333) + over65Calculation(vm.form.gross, vm.form.you.monthlySS, vm.form.you.retirement);
            }
            if(vm.other && vm.social && vm.form.spouse.age1 && !vm.form.spouse.age2){
                sumSpouse = (vm.form.income * 0.0333) + over55Calculation(vm.form.gross, vm.form.you.monthlySS, vm.form.you.retirement);
            }
            else if(vm.other && vm.social && vm.form.spouse.age1 && vm.form.spouse.age2){
                sumSpouse = (vm.form.income * 0.0333) + over65Calculation(vm.form.gross, vm.form.you.monthlySS, vm.form.you.retirement);
            }
            sumAll = sumYou + sumSpouse;
            return sumAll;
        };


        vm.calculate = function calculate() {
            console.log('Running individual calculation');
            vm.resultsShown = true;
            var sum1 = baseCalculation();
            vm.result1 = sum1.toFixed(2);

            var sum2 = null;
            if(!vm.other && !vm.social){
                sum2 = vm.form.income * 0.0333;
                console.log('!vm.other && !vm.social', sum2);
                vm.result2 = sum2.toFixed(2);
            }
            else if(vm.other && !vm.social){
                sum2 = (vm.form.income * 0.0333) + (0.10 * vm.form.gross);
                console.log('vm.other && !vm.social', sum2);
                vm.result2 = sum2.toFixed(2);
            }
            else if(vm.other && vm.social && vm.filing === 'single'){
                sum2 = singleCalculation();
                console.log('vm.other && vm.social &&vm.filing single baseCalculation', sum2);
                vm.result2 = sum2.toFixed(2);
            }
            else if(vm.other && vm.social && vm.filing === 'joint'){
                sum2 = jointCalculation();
                console.log('vm.other && vm.social &&vm.filing joint baseCalculation', sum2);
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