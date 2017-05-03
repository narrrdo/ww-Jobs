(function () { 'use strict';

angular
  .module('app')
  .config(routesConfig);

routesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function routesConfig($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/sidebar.html',
      controller: 'SideBarController'
    })

    .state('app.jobList', {
      url: '/jobList',
      views: {
        'mainContent': {
          templateUrl: 'templates/jobList.html',
            controller: 'JobListController',
            controllerAs: "vm"
        }
      }
    })

    .state('app.jobDetail', {
      url: '/jobDetail/:id',
      views: {
        'mainContent': {
          templateUrl: 'templates/jobDetail.html',
            controller: 'JobDetailController',
            controllerAs: "vm"
        }
      }
    })
		
}
})(); 


