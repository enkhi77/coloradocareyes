(function () {
    'use strict';
    angular
        .module('app.form')
        .controller('indFormController', indFormController);

    function indFormController() {
        console.log('load indFormController');
        var vm = this;

        function setIndividualForm() {
            vm.resultsShown = null;
            vm.form = {
                premium: null,
                deductible: null,
                copay: null,
                expenses: null,
                income: null,
                SS: null,
                gross: null,
                you: {
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

        var baseCalculation = function baseCalculation() {
            var results = vm.form.premium * 12 + vm.form.deductible + vm.form.copay + vm.form.expenses;
            console.log('baseCalculation return', results);
            return results;
        };

        var indDeduction = function indDeduction(a, b) {
            return (12 * a) - 9000 + b;
        };

        var jointDeduction = function jointDeduction(a, b, c) {
            return (12 * a) - a / (c + a)(12000) + b;
        };

        var singleCalculation = function singleCalculation() {
            var individualDeductionFinal = indDeduction(vm.form.you.monthlySS, vm.form.you.retirement);
            if (vm.other && vm.social && vm.form.you.age1 && !vm.form.you.age2) {
                if (individualDeductionFinal > 20000) {
                    individualDeductionFinal = 20000;
                }
                return (vm.form.income * 0.0333) + (0.10 * (f - individualDeductionFinal));
            }
            else if (vm.other && vm.social && vm.form.you.age1 && vm.form.you.age2) {
                if (individualDeductionFinal > 24000) {
                    individualDeductionFinal = 24000;
                }
                return (vm.form.income * 0.0333) + (0.10 * (f - individualDeductionFinal));
            }
        };
        var jointCalculation = function jointCalculation() {
            var jointDeductionFinalYou = jointDeduction(vm.form.you.monthlySS, vm.form.you.retirement, vm.form.spouse.monthlySS);
            var jointDeductionFinalSpouse = jointDeduction(vm.form.spouse.monthlySS, vm.form.spouse.retirement, vm.form.you.monthlySS);
            if (vm.other && vm.social && vm.form.you.age1 && !vm.form.you.age2 && jointDeductionFinalYou > 20000) {
                jointDeductionFinalYou = 20000;
            }
            else if (vm.other && vm.social && vm.form.you.age1 && vm.form.you.age2 && jointDeductionFinalYou > 24000) {
                jointDeductionFinalYou = 24000;
            }
            if (vm.other && vm.social && vm.form.spouse.age1 && !vm.form.spouse.age2 && jointDeductionFinalSpouse > 20000) {
                jointDeductionFinalSpouse = 20000;
            }
            else if (vm.other && vm.social && vm.form.spouse.age1 && vm.form.spouse.age2 && jointDeductionFinalSpouse > 24000) {
                jointDeductionFinalSpouse = 24000;
            }
            return (vm.form.income * 0.0333) + (0.10 * (f - jointDeductionFinalYou - jointDeductionFinalSpouse));
        };


        vm.calculate = function calculate() {
            console.log('Running individual calculation');
            vm.resultsShown = true;
            var sum1 = baseCalculation();
            vm.result1 = sum1.toFixed(2);

            var sum2 = null;
            if (!vm.other && !vm.social) {
                sum2 = vm.form.income * 0.0333;
                console.log('!vm.other && !vm.social', sum2);
                vm.result2 = sum2.toFixed(2);
            }
            else if (vm.other && !vm.social) {
                sum2 = (vm.form.income * 0.0333) + (0.10 * vm.form.gross);
                console.log('vm.other && !vm.social', sum2);
                vm.result2 = sum2.toFixed(2);
            }
            else if (vm.other && vm.social && vm.filing === 'single') {
                sum2 = singleCalculation();
                console.log('vm.other && vm.social &&vm.filing single baseCalculation', sum2);
                vm.result2 = sum2.toFixed(2);
            }
            else if (vm.other && vm.social && vm.filing === 'joint') {
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