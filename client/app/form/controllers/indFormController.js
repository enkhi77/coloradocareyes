(function () {
    'use strict';
    angular.module('app.form')
        .controller('indFormController', indFormController);
    function indFormController() {
        var vm = this;
        vm.set1 = null;
        vm.set2 = null;
        vm.set3 = null;
        vm.set4a = null;
        vm.set4b = null;
        vm.set5a = null;
        vm.set5b = null;
        vm.set6 = null;
        vm.indivContrib = null;
        vm.coCare = null;
        vm.diff = null;
        vm.sumCheckResult = null;
        vm.form = {
            premium: 0,
            deductible: 0,
            copay: 0,
            expenses: 0,
            w2: 0,
            otherIncome: null,
            filing: null,
            irsSum: 0,
            irs20b: 0,
            spouseA: {
                age: null,
                monthlySS: 0,
                irs15b16b: 0,
                ssShare: null,
                exemption: null
            },
            spouseB: {
                age: null,
                monthlySS: 0,
                irs15b16b: 0,
                ssShare: null,
                exemption: null
            }
        };
        
        vm.sumCheck = sumCheck;
        vm.move = move;
        vm.startOver = startOver;
        
        activate();
        
        function activate() {
            vm.set1 = true;
            console.log('init indFormController vm.set1', vm.set1);
        }
        
        function move(set) {
            switch (set) {
                case 'set1':
                    vm.set1 = true;
                    vm.set2 = null;
                    vm.set3 = null;
                    vm.set4a = null;
                    vm.set4b = null;
                    vm.set5a = null;
                    vm.set5b = null;
                    vm.set6 = null;
                    break;
                case 'set2':
                    vm.set1 = null;
                    vm.set2 = true;
                    vm.set3 = null;
                    vm.set4a = null;
                    vm.set4b = null;
                    vm.set5a = null;
                    vm.set5b = null;
                    vm.set6 = null;
                    break;
                case 'set3':
                    vm.set1 = null;
                    vm.set2 = null;
                    vm.set3 = true;
                    vm.set4a = null;
                    vm.set4b = null;
                    vm.set5a = null;
                    vm.set5b = null;
                    vm.set6 = null;
                    break;
                case 'set4a':
                    vm.set1 = null;
                    vm.set2 = null;
                    vm.set3 = null;
                    vm.set4a = true;
                    vm.set4b = null;
                    vm.set5a = null;
                    vm.set5b = null;
                    vm.set6 = null;
                    break;
                case 'set4b':
                    vm.set1 = null;
                    vm.set2 = null;
                    vm.set3 = null;
                    vm.set4a = null;
                    vm.set4b = true;
                    vm.set5a = null;
                    vm.set5b = null;
                    vm.set6 = null;
                    break;
                case 'set5a':
                    vm.set1 = null;
                    vm.set2 = null;
                    vm.set3 = null;
                    vm.set4a = null;
                    vm.set4b = null;
                    vm.set5a = true;
                    vm.set5b = null;
                    vm.set6 = null;
                    break;
                case 'set5b':
                    vm.set1 = null;
                    vm.set2 = null;
                    vm.set3 = null;
                    vm.set4a = null;
                    vm.set4b = null;
                    vm.set5a = null;
                    vm.set5b = true;
                    vm.set6 = null;
                    break;
                case 'set6':
                    vm.set1 = null;
                    vm.set2 = null;
                    vm.set3 = null;
                    vm.set4a = null;
                    vm.set4b = null;
                    vm.set5a = null;
                    vm.set5b = null;
                    vm.set6 = true;
                    calc();
                    break;
            }
        }
        
        function startOver() {
            vm.form = {
                premium: 0,
                deductible: 0,
                copay: 0,
                expenses: 0,
                w2: 0,
                otherIncome: null,
                filing: null,
                irsSum: 0,
                irs20b: 0,
                spouseA: {
                    age: null,
                    monthlySS: 0,
                    irs15b16b: 0,
                    ssShare: null,
                    exemption: null
                },
                spouseB: {
                    age: null,
                    monthlySS: 0,
                    irs15b16b: 0,
                    ssShare: null,
                    exemption: null
                }
            };
            move('set1');
        }
        
        function sumCheck() {
            switch (vm.form.filing) {
                case 'single':
                    console.log('single sumCheck', vm.form.irs20b + vm.form.spouseA.irs15b16b > vm.form.irsSum);
                    if (vm.form.irs20b + vm.form.spouseA.irs15b16b > vm.form.irsSum) {
                        return true;
                    }
                    break;
                case 'joint':
                    if (vm.form.irs20b + vm.form.spouseA.irs15b16b + vm.form.spouseB.irs15b16b > vm.form.irsSum) {
                        return true;
                    }
                    break;
            }
        }
        
        function calc() {
            vm.indivContrib = (vm.form.premium * 12) + vm.form.deductible + vm.form.copay + vm.form.expenses;
    
            var CCPercentTax = 0.1;
            var CCW2PercentTax = 0.0333;
            var IncomeTaxCapSingle = 350000;
            var IncomeTaxCapFamily = 450000;
    
            var incomeRetirementExemption55Plus = 20000;
            var incomeRetirementExemption65Plus = 4000;
    
            console.log(vm.form.w2, vm.form.nonw2, vm.form.irs20b, vm.form.spouseA.age);
            var w2 = vm.form.w2;
            var incomeRetirement = null;
            if(vm.form.filing === 'single'){
                incomeRetirement = vm.form.spouseA.irs15b16b + vm.form.irs20b;
            }
            else if(vm.form.filing === 'joint'){
                incomeRetirement = vm.form.spouseA.irs15b16b + vm.form.spouseB.irs15b16b + vm.form.irs20b;
            }
            var nonw2 = vm.form.irs20b - incomeRetirement;
            var exemptionRetirement = 0;
    
            switch (vm.form.spouseA.age) {
                case 'over':
                    exemptionRetirement +=   incomeRetirementExemption65Plus;
                case 'between':
                    exemptionRetirement +=   incomeRetirementExemption55Plus;
                    break;
            }
    
            var incomeTaxCap = 0;
            if (vm.form.filing === 'single') {
                incomeTaxCap = IncomeTaxCapSingle;
            }
            else if(vm.form.filing === 'joint'){
                incomeTaxCap = IncomeTaxCapFamily;
                switch (vm.form.spouseB.age) {
                    case 'over':
                        exemptionRetirement +=   incomeRetirementExemption65Plus;
                    case 'between':
                        exemptionRetirement +=   incomeRetirementExemption55Plus;
                        break;
                }
            }
    
            // adjust line retirement income lines 15b, 16b, and 20b with exemptions
            if (incomeRetirement > exemptionRetirement) {
                incomeRetirement -= exemptionRetirement;
                exemptionRetirement = 0;
            } else if (incomeRetirement > 0) {
                exemptionRetirement -= incomeRetirement;
                incomeRetirement = 0;
            }
            
            // TAX CAP
            // first tax on the w2 income - tax this first for individual as employer has already paid on this one
            if (w2 >= incomeTaxCap) {
                w2 = incomeTaxCap;
                incomeTaxCap = 0;
            } else if (w2 > 0) {
                incomeTaxCap -= w2;
            }
    
            // second apply the remaining cap to nonw2 income - paying full tax, so after w2 tax this last
            if (nonw2 >= incomeTaxCap) {
                nonw2 = incomeTaxCap;
                incomeTaxCap = 0;
            } else if (nonw2 > 0) {
                incomeTaxCap -= nonw2;
            }
    
    
            // third apply the remaining cap to after exemptionRetirement income - paying full tax, so after w2 tax this last
            if (incomeRetirement >= incomeTaxCap) {
                incomeRetirement = incomeTaxCap;
                incomeTaxCap = 0;
            } else if (incomeRetirement > 0) {
                incomeTaxCap -= incomeRetirement;
            }
    
            var w2Tax = w2 * (CCW2PercentTax);
            var nonw2Tax = nonw2 * CCPercentTax;
            var incomeRetirementTax = incomeRetirement * CCPercentTax;
    
            vm.coCare = w2Tax + nonw2Tax + incomeRetirementTax;
            
            vm.indivContrib = (vm.form.premium * 12) + vm.form.deductible + vm.form.copay + vm.form.expenses;
            vm.diff = vm.indivContrib - vm.coCare;
            // cost of the current insurance
            // currentCost = currentAnnualPremiums + currentMedicalPolicyCharges + currentExtra;
            // currentRealCost = results.currentCost - results.hsaTaxSavings;
            //
            // savingsColoradoCare = currentRealCost - coloradoCareRealCost;
        }
    }
})();