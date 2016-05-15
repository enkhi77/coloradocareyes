(function () {
    'use strict';
    angular
        .module('app.form')
        .controller('indFormController', indFormController);

    function indFormController() {
        // console.log('load indFormController');
        var vm = this;

        function setIndividualForm() {
            vm.resultsShown = null;
            vm.form = {
                premium: 0,
                deductible: 0,
                copay: 0,
                expenses: 0,
                income: 0,
                SS: 0,
                gross: 0,
                you: {
                    receiveSS: 0,
                    monthlySS: 0,
                    retirement: 0,
                    age: null
                },
                spouse: {
                    receiveSS: 0,
                    monthlySS: 0,
                    retirement: 0,
                    age: null
                }
            };
            vm.other = 0;
            vm.social = 0;
            vm.medicaid = 0;
            vm.medicare = 0;
            vm.filing = 0;
            vm.results = {
                you: {
                    annualSS: 0,
                    applicableSS: 0,
                    applicableRet: 0,
                    postApplicableRet: 0,
                    SSRetirementIncome: 0,
                    calcRetirement: 0,
                    healthcareCost: 0,
                    CCCost: 0,
                    savings: 0
                },
                spouse: {
                    annualSS: 0,
                    applicableSS: 0,
                    applicableRet: 0,
                    postApplicableRet: 0,
                    SSRetirementIncome: 0,
                    calcRetirement: 0,
                    healthcareCost: 0,
                    CCCost: 0,
                    savings: 0
                },
                joint: {
                    applicableSS: 0,
                    SSRetirementIncome: 0
                }

            };
            vm.result1 = 0;
            vm.result2 = 0;
            vm.result3 = 0;
            vm.difference = 0;
            vm.resultFiling = 0;
        }

        setIndividualForm();

        var baseCalculation = function baseCalculation() {
            var results = vm.form.premium * 12 + vm.form.deductible + vm.form.copay + vm.form.expenses;
            // console.log('baseCalculation return', results);
            return results;
        };

        var indDeduction = function indDeduction(a, b) {
            console.log('indDeduction a', 12 * a);
            console.log('indDeduction b', b);
            console.log('calculated amount', (12 * a) - 9000 + b);
            return (12 * a) - 9000 + b;
        };

        var jointDeduction = function jointDeduction(a, b, c) {
            // console.log('Check a', a);
            // console.log('check b', b);
            // console.log('check c', c);
            return (12 * a) - a / (c + a) * 12000 + b;
        };

        var singleCalculation = function singleCalculation() {
            var individualDeductionFinal = indDeduction(vm.form.you.monthlySS, vm.form.you.retirement);
            console.log('individualDeductionFinal', individualDeductionFinal);
            if (vm.other && vm.social && vm.form.you.age === 'under65') {
                if (individualDeductionFinal > 20000) {
                    individualDeductionFinal = 20000;
                    console.log('setting individualDeductionFinal to max', individualDeductionFinal);
                }
                var deductionFinal = vm.form.gross - individualDeductionFinal;
                // console.log('checking deductionFinal', deductionFinal);
                if(deductionFinal > 350000 - vm.form.income){
                    if(deductionFinal - vm.form.income > 350000 - vm.form.income){
                        deductionFinal = 350000 - vm.form.income;
                    }
                    else {
                        deductionFinal = deductionFinal - vm.form.income;
                    }
                    console.log('setting deductionFinal to max', deductionFinal);
                }
                return (vm.form.income * 0.0333) + (deductionFinal * 0.10);
            }
            else if (vm.other && vm.social && vm.form.you.age === 'over65') {
                if (individualDeductionFinal > 24000) {
                    individualDeductionFinal = 24000;
                    console.log('setting individualDeductionFinal to max', individualDeductionFinal);
                }
                var deductionFinal = vm.form.gross - individualDeductionFinal;
                console.log('checking deductionFinal', deductionFinal);
                if(deductionFinal > 350000 - vm.form.income){
                    deductionFinal = deductionFinal - vm.form.income;
                    console.log('setting deductionFinal to max', deductionFinal);
                }
                return (vm.form.income * 0.0333) + (deductionFinal * 0.10);
            }
        };
        var jointCalculation = function jointCalculation() {
            var jointDeductionFinalYou = jointDeduction(vm.form.you.monthlySS, vm.form.you.retirement, vm.form.spouse.monthlySS);
            var jointDeductionFinalSpouse = jointDeduction(vm.form.spouse.monthlySS, vm.form.spouse.retirement, vm.form.you.monthlySS);
            // console.log('jointDeductionFinalYou', jointDeductionFinalYou);
            // console.log('jointDeductionFinalSpouse', jointDeductionFinalSpouse);
            if (vm.other && vm.social && !vm.form.you.age) {
                jointDeductionFinalYou = 0;
                vm.resultJointYou = jointDeductionFinalYou;
            }
            else if (vm.other && vm.social && vm.form.you.age === 'under65' && jointDeductionFinalYou > 20000) {
                jointDeductionFinalYou = 20000;
                //console.log('over 20000 for you', jointDeductionFinalYou);
                vm.resultJointYou = jointDeductionFinalYou;
            }
            else if (vm.other && vm.social && vm.form.you.age === 'over65' && jointDeductionFinalYou > 24000) {
                jointDeductionFinalYou = 24000;
                //console.log('over 24000 for you', jointDeductionFinalYou);
                vm.resultJointYou = jointDeductionFinalYou;
            }

            if (vm.other && vm.social && !vm.form.spouse.age) {
                jointDeductionFinalSpouse = 0;
                vm.resultJointSpouse = jointDeductionFinalSpouse;
            }
            else if (vm.other && vm.social && vm.form.spouse.age === 'under65' && jointDeductionFinalSpouse > 20000) {
                jointDeductionFinalSpouse = 20000;
                //console.log('over 20000 for spouse', jointDeductionFinalSpouse);
                vm.resultJointSpouse = jointDeductionFinalSpouse;
            }
            else if (vm.other && vm.social && vm.form.spouse.age === 'over65' && jointDeductionFinalSpouse > 24000) {
                jointDeductionFinalSpouse = 24000;
                //console.log('over 24000 for spouse', jointDeductionFinalSpouse);
                vm.resultJointSpouse = jointDeductionFinalSpouse;
            }
            //console.log('Check you final', jointDeductionFinalYou);
            //console.log('Check spouse final', jointDeductionFinalSpouse);
            var deductionFinal = vm.form.gross - jointDeductionFinalYou - jointDeductionFinalSpouse;
            if(deductionFinal > 450000 - vm.form.income){
                if(deductionFinal - vm.form.income < 450000 - vm.form.income){

                }
                else {
                    deductionFinal = deductionFinal - vm.form.income;
                }
            }
            return (vm.form.income * 0.0333) + (0.10 * deductionFinal);
        };

        vm.calculate = function calculate() {
            vm.resultsShown = true;
            var sum1 = baseCalculation();
            vm.result1 = sum1.toFixed(2);
            if (!vm.result1) {
                vm.result1 = 'There has been an error calculating the result.  Please notify the webmaster';
            }

            var sum2 = 0;
            if (!vm.other && !vm.social) {
                sum2 = vm.form.income * 0.0333;
                vm.result2 = sum2.toFixed(2);
            }
            else if (vm.other && !vm.social) {
                var adjgross = 0;
                if(vm.form.gross > 350000 - vm.form.income) {
                    if(vm.form.gross - vm.form.income > 350000 - vm.form.income){
                        adjgross = 350000 - vm.form.income;
                    }
                    else {
                        adjgross = vm.form.gross - vm.form.income;
                    }
                }
                else {
                    adjgross = vm.form.gross;
                }
                sum2 = (vm.form.income * 0.0333) + (0.10 * adjgross);
                vm.result2 = sum2.toFixed(2);
            }
            else if (vm.other && vm.social && vm.filing === 'single') {
                sum2 = singleCalculation();
                if (sum2 < 0) {
                    sum2 = 0;
                }
                vm.result2 = sum2.toFixed(2);
            }
            else if (vm.other && vm.social && vm.filing === 'joint') {
                sum2 = jointCalculation();
                if (sum2 < 0) {
                    sum2 = 0;
                }
                vm.result2 = sum2.toFixed(2);
            }
            if (!vm.result2) {
                vm.result2 = 'There has been an error calculating the result.  Please notify the webmaster';
            }

            var sum3 = vm.result1 - vm.result2;
            vm.difference = sum3.toFixed(2);
            if (!vm.difference) {
                vm.difference = 'There has been an error calculating the result.  Please notify the webmaster';
            }
        };

        vm.clear = function clear() {
            setIndividualForm();
        };
    }
})();