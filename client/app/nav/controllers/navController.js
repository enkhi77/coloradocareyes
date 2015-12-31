(function(){
    angular
        .module('app.nav')
        .controller('navController', navController);

    navController.$inject = [];

    function navController(){
        var vm = this;

        vm.test = 'test nav'
    }
})();