(function(){
    'use strict';
    angular
        .module('app')
        .config(indexConfig);

    indexConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];

    function indexConfig($stateProvider, $locationProvider, $urlRouterProvider){
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'app/index/templates/index.tpl.html',
                controller: 'indexController as vm'
            })
            .state('index.home', {
                url: 'home',
                templateUrl: 'app/index/templates/home.tpl.html',
                controller: 'indexController as vm'
            });
    }
});