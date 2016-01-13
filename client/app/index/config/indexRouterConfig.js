(function(){
    'use strict';
    angular
        .module('app')
        .config(indexConfig);

    indexConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];

    function indexConfig($stateProvider, $locationProvider, $urlRouterProvider){
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('index', {
                url: '/',
                abstract: true,
                templateUrl: 'app/index/templates/index.tpl.html',
                controller: 'indexController as vm'
            })
            .state('index.business', {
                url: 'business',
                templateUrl: 'app/form/templates/business.tpl.html',
                controller: 'busFormController as vm'
            })
            .state('index.individual', {
                url: 'individual',
                templateUrl: 'app/form/templates/individual.tpl.html',
                controller: 'indFormController as vm'
            });
    }
})();