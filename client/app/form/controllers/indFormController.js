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
                irsRetirement: 0,
                ssShare: null,
                exemption: null
            },
            spouseB: {
                age: null,
                monthlySS: 0,
                irsRetirement: 0,
                ssShare: null,
                exemption: null
            }
        };

        vm.move = move;
        vm.startOver = startOver;

        activate();

        function activate() {
            vm.set1 = true;
            console.log('init indFormController vm.set1', vm.set1);
        }

        function move(set){
            switch(set){
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
                    irsRetirement: 0,
                    ssShare: null,
                    exemption: null
                },
                spouseB: {
                    age: null,
                    monthlySS: 0,
                    irsRetirement: 0,
                    ssShare: null,
                    exemption: null
                }
            };
            move('set1');
        }
        
        function ssRatioCalc(){
            vm.form.spouseA.ssShare = (12 * vm.form.spouseA.monthlySS)/ vm.form.irs20b;
            vm.form.spouseB.ssShare = (12 * vm.form.spouseB.monthlySS)/ vm.form.irs20b;
        }

        function jointCalc(){
            console.log('jointCalc vm.form', vm.form);
            var taxIncome = vm.form.irsSum - (vm.form.spouseA.exemption + vm.form.spouseB.exemption);
            vm.coCare = Number((taxIncome * 0.1) + (vm.form.w2 * 0.0333)).toFixed(2);
            vm.diff = (vm.indivContrib - vm.coCare).toFixed();
        }

        function calc() {
            vm.indivContrib = (vm.form.premium * 12) + vm.form.deductible + vm.form.copay + vm.form.expenses;
            switch(vm.form.filing){
                case 'single':
                    switch(vm.form.spouseA.age){
                        case 'under':
                            vm.coCare = Number((vm.form.w2 * 0.0333) + (vm.form.irsSum) * 0.1).toFixed(2);
                            vm.diff = vm.indivContrib - vm.coCare;
                            break;
                        case 'between':
                            var sum = vm.form.irs20b + vm.form.spouseA.irsRetirement;
                            if(sum > 20000){
                                vm.coCare = Number((vm.form.w2 * 0.0333) + ((vm.form.irsSum - 20000) * 0.1)).toFixed(0);
                            }
                            else {
                                vm.coCare = Number((vm.form.w2 * 0.0333) + ((vm.form.irsSum - sum)* 0.1)).toFixed(0);
                            }
                            vm.diff = vm.indivContrib - vm.coCare;
                            break;
                        case 'over':
                            var sum = vm.form.irs20b + vm.form.spouseA.irsRetirement;
                            if(sum > 24000){
                                vm.coCare = Number((0.1 * (vm.form.irsSum - 24000)) + (vm.form.w2 * 0.0333)).toFixed(2);
                            }
                            else{
                                vm.coCare = Number((0.1 * (vm.form.irsSum - sum)) + (vm.form.w2 * 0.0333)).toFixed(2);
                            }
                            vm.diff = vm.indivContrib - vm.coCare;
                            break;
                    }
                    break;
                case 'joint':
                    if(vm.form.spouseA.age === 'under' && vm.form.spouseB.age === 'under'){
                        vm.coCare = Number((0.1 * vm.form.irsSum) + (vm.form.w2 * 0.0333)).toFixed();
                        vm.diff = vm.indivContrib - vm.coCare;
                    }
                    else{
                        ssRatioCalc();
                        switch(vm.form.spouseA.age){
                            case 'under':
                                vm.form.spouseA.exemption = 0;
                                break;
                            case 'between':
                                var sum = vm.form.spouseA.irsRetirement + vm.form.spouseA.ssShare;
                                if(sum > 20000){
                                    vm.form.spouseA.exemption = 20000;
                                }
                                else{
                                    vm.form.spouseA.exemption = sum;
                                }
                                break;
                            case 'over':
                                var sum = vm.form.spouseA.irsRetirement + vm.form.spouseA.ssShare;
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
                                var sum = vm.form.spouseB.irsRetirement + vm.form.spouseB.ssShare;
                                if(sum > 20000){
                                    vm.form.spouseB.exemption = 20000;
                                }
                                else{
                                    vm.form.spouseB.exemption = sum;
                                }
                                break;
                            case 'over':
                                var sum = vm.form.spouseB.irsRetirement + vm.form.spouseB.ssShare;
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
                    break;
                default:
                    vm.coCare = Number(vm.form.w2 * 0.0333).toFixed(0);
                    vm.diff = (vm.indivContrib - vm.coCare).toFixed(0);
            }
        }
    }
})();