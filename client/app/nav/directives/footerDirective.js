(function(){
    'use strict';
    angular
        .module('app.nav')
        .directive('footer', footer);

    function footer(){
        var directive = {
            templateUrl: 'app/nav/templates/footer.tpl.html',
            restrict: 'EA',
            controller: 'footerController',
            controllerAs: 'vm'
        };
        return directive;
    }
})();