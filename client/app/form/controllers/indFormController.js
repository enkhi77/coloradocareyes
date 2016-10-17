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

        vm.sumCheck = sumCheck;
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
        
        function sumCheck() {
            switch(vm.form.filing){
                case 'single':
                    console.log('single sumCheck', vm.form.irs20b + vm.form.spouseA.irsRetirement > vm.form.irsSum);
                    if(vm.form.irs20b + vm.form.spouseA.irsRetirement > vm.form.irsSum){
                        return true;
                    }
                    break;
                case 'joint':
                    if(vm.form.irs20b + vm.form.spouseA.irsRetirement + vm.form.spouseB.irsRetirement > vm.form.irsSum){
                        return true;
                    }
                    break;
            }
        }
        
        function ssRatioCalc(){
            vm.form.spouseA.ssShare = (12 * vm.form.spouseA.monthlySS)/ vm.form.irs20b;
            vm.form.spouseB.ssShare = (12 * vm.form.spouseB.monthlySS)/ vm.form.irs20b;
        }

        function jointCalc(){
            console.log('jointCalc vm.form', vm.form);
            var taxIncome = vm.form.irsSum - (vm.form.spouseA.exemption + vm.form.spouseB.exemption);
            if(taxIncome > 0){
                vm.coCare = Number((taxIncome * 0.1) + (vm.form.w2 * 0.0333)).toFixed(2);
            }
            else {
                vm.coCare = Number(vm.form.w2 * 0.0333).toFixed(2);
            }
            vm.diff = (vm.indivContrib - vm.coCare).toFixed(2);
        }

/*
 
 	$scope.CCPercentTax = 0.1;
	$scope.CCW2PercentTax = 0.0333;
  $scope.IncomeTaxCapSingle = 350000;
  $scope.IncomeTaxCapFamily = 450000;

  $scope.incomeRetirementExemption55Plus = 20000;
  $scope.incomeRetirementExemption65Plus = 4000;
 
 
  function analysis(formData) {
    console.log(formData.w2, formData.nonw2, formData.line20b, formData.age1.value, formData.workPercentageSubsidy, formData.workMoneySubsidy);
  	let w2 = formData.w2;
  	let nonw2 = formData.nonw2;
    let exemptionRetirement = 0;
    let incomeRetirement = formData.line15b + formData.line16b + formData.line20b;
    let results = {};
    let federalIncomeAGI = w2+nonw2+incomeRetirement;
    let statePercentageTax = 0.05;
    let stateName = "Colorado";

    switch (formData.age1.value) {
  	case "65+":
  		exemptionRetirement +=   $scope.incomeRetirementExemption65Plus;
    case "55-64":
    	exemptionRetirement +=   $scope.incomeRetirementExemption55Plus;
      break;
    }

    let incomeTaxCap = 0;
    if (formData.selectedHousehold.value == 1) {
    	incomeTaxCap = $scope.IncomeTaxCapSingle;
    } else {
    	incomeTaxCap = $scope.IncomeTaxCapFamily;
      switch (formData.age2.value) {
    	case "65+":
    		exemptionRetirement +=   $scope.incomeRetirementExemption65Plus;
      case "55-64":
      	exemptionRetirement +=   $scope.incomeRetirementExemption55Plus;
        break;
      }
    }

    results.exemptionRetirement = exemptionRetirement;
    results.incomeRetirement = incomeRetirement;

    // adjust line retirement income lines 15b, 16b, and 20b with exemptions
  	if (incomeRetirement > exemptionRetirement) {
  		incomeRetirement -= exemptionRetirement;
  		exemptionRetirement = 0;
  	} else if (incomeRetirement > 0) {
  		exemptionRetirement -= incomeRetirement;
  		incomeRetirement = 0;
  	}
    results.exemptionRetirementLeftOver = exemptionRetirement;
    results.incomeRetirementAfterExemptions = incomeRetirement;
    results.w2 = w2;
    results.nonw2 = nonw2;
    
    results.incomeTaxCap = incomeTaxCap;
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
  	
    let w2Tax = w2 * ($scope.CCW2PercentTax - formData.workPercentageSubsidy/100);
    let nonw2Tax = nonw2 * $scope.CCPercentTax;
    let incomeRetirementTax = incomeRetirement * $scope.CCPercentTax;

  	
    results.incomeRetirementTaxableAfterExemptionAndCap = incomeRetirement;
    results.incomeRetirementTax = incomeRetirementTax;
    results.incomeTaxCapLeftOver = incomeTaxCap;
    results.nonw2Taxable = nonw2;
    results.nonw2Tax = +nonw2Tax.toFixed(2);
    results.w2Taxable = w2;
    results.w2Tax = w2Tax;
     
    let coloradoCareTax = w2Tax + nonw2Tax + incomeRetirementTax;
    results.coloradoCareTax = coloradoCareTax;
    
   
  	 results.currentAnnualPremiums = currentAnnualPremiums;
  	 results.currentMedicalPolicyChargesTotal = currentMedicalPolicyCharges;

  	 results.currentExtra = currentExtra;
  	 results.hsaContributions = hsaContributions;
  	 results.hsaTaxSavings = hsaContributions * (statePercentageTax + federalTaxRate/100);
  	 
     // cost of the current insurance 
  	 results.currentCost = currentAnnualPremiums + currentMedicalPolicyCharges + currentExtra;
  	 results.currentRealCost = results.currentCost - results.hsaTaxSavings;

     results.savingsColoradoCare = results.currentRealCost - results.coloradoCareRealCost;
     console.log(results.currentRealCost,results.coloradoCareRealCost);
     return results;
   }
 
 */        
        
        
        function calc() {
            vm.indivContrib = (vm.form.premium * 12) + vm.form.deductible + vm.form.copay + vm.form.expenses;
            switch(vm.form.filing){
                case 'single':
                    if(vm.form.w2 > 350000){
                        console.log('single w2 limit');
                        vm.form.w2 = 350000;
                    }
                    switch(vm.form.spouseA.age){
                        case 'under':
                            vm.coCare = Number((vm.form.w2 * 0.0333) + (vm.form.irsSum) * 0.1).toFixed(2);
                            vm.diff = vm.indivContrib - vm.coCare;
                            break;
                        case 'between':
                            var sum = vm.form.irs20b + vm.form.spouseA.irsRetirement;
                            console.log('between sum', sum);
                            if(sum > 20000){
                                if(vm.form.irsSum - 20000 > 0){
                                    vm.coCare = Number((vm.form.w2 * 0.0333) + ((vm.form.irsSum - 20000) * 0.1)).toFixed(2);
                                }
                                else {
                                    vm.coCare = Number(vm.form.w2 * 0.0333).toFixed(0);
                                }
                            }
                            else {
                                if(vm.form.irsSum - sum > 0){
                                    vm.coCare = Number((vm.form.w2 * 0.0333) + ((vm.form.irsSum - sum)* 0.1)).toFixed(2);
                                }
                                else {
                                    vm.coCare = Number(vm.form.w2 * 0.0333).toFixed(2);
                                }
                            }
                            vm.diff = vm.indivContrib - vm.coCare;
                            break;
                        case 'over':
                            var sum = vm.form.irs20b + vm.form.spouseA.irsRetirement;
                            console.log('over sum', sum);
                            if(sum > 24000){
                                if(vm.form.irsSum - 24000 > 0){
                                    vm.coCare = Number((0.1 * (vm.form.irsSum - 24000)) + (vm.form.w2 * 0.0333)).toFixed(2);
                                }
                                else {
                                    vm.coCare = Number(vm.form.w2 * 0.0333).toFixed(2);
                                }
                            }
                            else{
                                if(vm.form.irsSum - sum > 0){
                                    vm.coCare = Number((0.1 * (vm.form.irsSum - sum)) + (vm.form.w2 * 0.0333)).toFixed(2);
                                }
                                else {
                                    vm.coCare = Number(vm.form.w2 * 0.0333).toFixed(2);
                                }
                            }
                            vm.diff = vm.indivContrib - vm.coCare;
                            break;
                    }
                    break;
                case 'joint':
                    if(vm.form.w2 > 450000){
                        console.log('joint w2 limit');
                        vm.form.w2 = 450000;
                    }
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
                                var sum = vm.form.irs20b * vm.form.spouseA.ssShare + vm.form.spouseA.irsRetirement;
                                console.log('over sum', sum);
                                if(sum > 20000){
                                    vm.form.spouseA.exemption = 20000;
                                }
                                else{
                                    vm.form.spouseA.exemption = sum;
                                }
                                break;
                            case 'over':
                                var sum = vm.form.irs20b * vm.form.spouseA.ssShare + vm.form.spouseA.irsRetirement;
                                console.log('over sum', sum);
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
                                var sum = vm.form.irs20b * vm.form.spouseB.ssShare + vm.form.spouseB.irsRetirement;
                                console.log('between sum', sum);
                                if(sum > 20000){
                                    vm.form.spouseB.exemption = 20000;
                                }
                                else{
                                    vm.form.spouseB.exemption = sum;
                                }
                                break;
                            case 'over':
                                var sum = vm.form.irs20b * vm.form.spouseB.ssShare + vm.form.spouseB.irsRetirement;
                                console.log('over sum', sum);
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
                    vm.coCare = Number(vm.form.w2 * 0.0333).toFixed(2);
                    vm.diff = (vm.indivContrib - vm.coCare).toFixed(2);
            }
        }
    }
})();