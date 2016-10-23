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
        vm.w2Error = null;
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
        
        vm.nullCheck = nullCheck;
        vm.sumCheck = sumCheck;
        vm.onTextClick = onTextClick;
        vm.w2Check = w2Check;
        vm.move = move;
        vm.startOver = startOver;
        
        activate();
        
        function activate() {
            vm.set1 = true;
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
        
        function onTextClick(event){
            event.target.select();
        }
        
        function nullCheck(type){
            switch(type) {
                case 'w2':
                    console.log('w2Check', vm.form.w2);
                    if(vm.form.w2 <0){
                        vm.w2Error = true;
                    }
                    else if(!vm.form.w2){
                        vm.form.w2 = 0;
                    }
                    else if(vm.form.w2 >0){
                        vm.w2Error = false;
                    }
                    break;
                case 'irsSum':
                    console.log('irsSumCheck', vm.form.irsSum);
                    if(vm.form.irsSum <0){
                        vm.irsSumError = true;
                    }
                    else if(!vm.form.irsSum){
                        vm.form.irsSum = 0;
                    }
                    else if(vm.form.irsSum >0){
                        vm.irsSumError = false;
                    }
                    break;
                case 'irs20b':
                    console.log('irs20bCheck', vm.form.irs20b);
                    if(vm.form.irs20b <0){
                        vm.irs20bError = true;
                    }
                    else if(!vm.form.irs20b){
                        vm.form.irs20b = 0;
                    }
                    else if(vm.form.irs20b >0){
                        vm.irs20bError = false;
                    }
                    break;
                case 'irsmonthly':
                    console.log('spouseA.monthlySSCheck', vm.form.spouseA.monthlySS);
                    if(vm.form.spouseA.monthlySS <0){
                        vm.spouseA.monthlySSError = true;
                    }
                    else if(!vm.form.spouseA.monthlySS){
                        vm.form.spouseA.monthlySS = 0;
                    }
                    else if(vm.form.spouseA.monthlySS >0){
                        vm.spouseA.monthlySSError = false;
                    }
                    break;
                case 'irs15b16b':
                    console.log('spouseA.irs15b16bCheck', vm.form.spouseA.irs15b16b);
                    if(vm.form.spouseA.irs15b16b <0){
                        vm.spouseA.irs15b16bError = true;
                    }
                    else if(!vm.form.spouseA.irs15b16b){
                        vm.form.spouseA.irs15b16b = 0;
                    }
                    else if(vm.form.spouseA.irs15b16b >0){
                        vm.spouseA.irs15b16bError = false;
                    }
                    break;
                case 'joint-monthly':
                    console.log('spouseB.monthlySSCheck', vm.form.spouseB.monthlySS);
                    if(vm.form.spouseB.monthlySS <0){
                        vm.spouseB.monthlySSError = true;
                    }
                    else if(!vm.form.spouseB.monthlySS){
                        vm.form.spouseB.monthlySS = 0;
                    }
                    else if(vm.form.spouseB.monthlySS >0){
                        vm.spouseB.monthlySSError = false;
                    }
                    break;
                case 'joint-irs15b16b':
                    console.log('spouseb.irs15b16b Check', vm.form.spouseB.irs15b16b);
                    if(vm.form.spouseB.irs15b16b <0){
                        vm.spouseB.irs15b16bError = true;
                    }
                    else if(!vm.form.spouseB.irs15b16b){
                        vm.form.spouseB.irs15b16b = 0;
                    }
                    else if(vm.form.spouseB.irs15b16b >0){
                        vm.spouseB.irs15b16bError = false;
                    }
                    break;
            }
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
                    console.log('joint sumCheck', vm.form.irs20b + vm.form.spouseA.irs15b16b + vm.form.spouseB.irs15b16b > vm.form.irsSum);
                    if (vm.form.irs20b + vm.form.spouseA.irs15b16b + vm.form.spouseB.irs15b16b > vm.form.irsSum) {
                        return true;
                    }
                    break;
            }
        }
        
        function w2Check() {
            
        }
        
        function ssRatioCalc() {
            if (vm.form.irs20b === 0) {
                vm.form.spouseA.ssShare = 0;
                vm.form.spouseB.ssShare = 0;
            }
            else {
                vm.form.spouseA.ssShare = (12 * vm.form.spouseA.monthlySS) / vm.form.irs20b;
                vm.form.spouseB.ssShare = (12 * vm.form.spouseB.monthlySS) / vm.form.irs20b;
            }
        }

        function jointCalc() {
            var taxIncome = vm.form.irsSum - (vm.form.spouseA.exemption + vm.form.spouseB.exemption);
            var jointExemption  = vm.form.spouseA.exemption + vm.form.spouseB.exemption;
            if (taxIncome > 0 && vm.form.w2 > 450000){
                vm.coCare = Number((taxIncome * 0.1) + (450000 * 0.0333)).toFixed(2);
            }
            else if (taxIncome > 0 && taxIncome + vm.form.w2 > 450000){
                vm.coCare = Number(((450000 - vm.form.w2) *0.1) + (vm.form.w2 * 0.0333)).toFixed(2);
            }
            else if (taxIncome > 0 && jointExemption + vm.form.w2 < 450000) {
                vm.coCare = Number((taxIncome * 0.1) + (vm.form.w2 * 0.0333)).toFixed(2);
            }
            else {
                vm.coCare = Number(vm.form.w2 * 0.0333).toFixed(2);
            }
            vm.diff = (vm.indivContrib - vm.coCare).toFixed(2);
        }
        
        function calc() {
            ssRatioCalc();
            console.log('vm.form.w2', vm.form.w2);
            var CCPercentTax = 0.1;
            var CCW2PercentTax = 0.0333;
            var IncomeTaxCapSingle = 350000;
            var IncomeTaxCapFamily = 450000;
            var incomeRetirementExemption55Plus = 20000;
            var incomeRetirementExemption65Plus = 4000;

            var w2 = vm.form.w2;
            var incomeRetirement = null;
            if (vm.form.filing === 'single') {
                incomeRetirement = vm.form.spouseA.irs15b16b + vm.form.irs20b;
            }
            else if (vm.form.filing === 'joint') {
                incomeRetirement = vm.form.spouseA.irs15b16b + vm.form.spouseB.irs15b16b + vm.form.irs20b;
            }
            var nonw2 = vm.form.irsSum - incomeRetirement;
            var exemptionRetirement = 0;

            switch (vm.form.spouseA.age) {
                case 'over':
                    exemptionRetirement += incomeRetirementExemption65Plus;
                case 'between':
                    exemptionRetirement += incomeRetirementExemption55Plus;
                    break;
            }

            var incomeTaxCap = 0;
            if (vm.form.filing === 'single') {
                incomeTaxCap = IncomeTaxCapSingle;
            }
            else if (vm.form.filing === 'joint') {
                incomeTaxCap = IncomeTaxCapFamily;
                switch (vm.form.spouseB.age) {
                    case 'over':
                        exemptionRetirement += incomeRetirementExemption65Plus;
                    case 'between':
                        exemptionRetirement += incomeRetirementExemption55Plus;
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
            console.log('pre-incomeTaxCap w2', w2);
            if (w2 >= incomeTaxCap) {
                w2 = incomeTaxCap;
                incomeTaxCap = 0;
            } else if (w2 > 0) {
                incomeTaxCap -= w2;
            }
            console.log('post-incomeTaxCap w2', w2);
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

            // console.log('w2', w2);
            // console.log('nonw2', nonw2);
            // console.log('incomeRetirement', incomeRetirement);

            var w2Tax = w2 * (CCW2PercentTax);
            var nonw2Tax = nonw2 * CCPercentTax;
            var incomeRetirementTax = incomeRetirement * CCPercentTax;

            if(vm.form.filing === 'single'){
                vm.coCare = w2Tax + nonw2Tax + incomeRetirementTax;
            }
            else if (vm.form.filing === 'joint'){
                ssRatioCalc();
                switch(vm.form.spouseA.age){
                    case 'under':
                        vm.form.spouseA.exemption = 0;
                        break;
                    case 'between':
                        var sum = vm.form.irs20b * vm.form.spouseA.ssShare + vm.form.spouseA.irs15b16b;
                        if(sum > 20000){
                            vm.form.spouseA.exemption = 20000;
                        }
                        else{
                            vm.form.spouseA.exemption = sum;
                        }
                        break;
                    case 'over':
                        var sum = vm.form.irs20b * vm.form.spouseA.ssShare + vm.form.spouseA.irs15b16b;
                        if(sum > 24000){
                            vm.form.spouseA.exemption = 24000;
                        }
                        else{
                            vm.form.spouseA.exemption = sum;
                        }
                        break;
                }
                switch(vm.form.spouseB.age){
                    case 'under':
                        vm.form.spouseB.exemption = 0;
                        break;
                    case 'between':
                        var sum = vm.form.irs20b * vm.form.spouseB.ssShare + vm.form.spouseB.irs15b16b;
                        if(sum > 20000){
                            vm.form.spouseB.exemption = 20000;
                        }
                        else{
                            vm.form.spouseB.exemption = sum;
                        }
                        break;
                    case 'over':
                        var sum = vm.form.irs20b * vm.form.spouseB.ssShare + vm.form.spouseB.irs15b16b;
                        if(sum > 24000){
                            vm.form.spouseB.exemption = 24000;
                        }
                        else{
                            vm.form.spouseB.exemption = sum;
                        }
                        break;
                }
                jointCalc();
            }
            vm.indivContrib = (vm.form.premium * 12) + vm.form.deductible + vm.form.copay + vm.form.expenses;
            vm.diff = vm.indivContrib - vm.coCare;
            
        }
    }
})();