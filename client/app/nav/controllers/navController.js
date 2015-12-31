(function(){
    angular
        .module('app.nav')
        .controller('navController', navController);

    navController.$inject = [];

    function navController(){
        console.log('load navController');
        var vm = this;
    }
})();