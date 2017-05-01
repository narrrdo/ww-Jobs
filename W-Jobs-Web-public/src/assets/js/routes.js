(function () { 'use strict';

angular
  .module('app')
  .config(routesConfig);

routesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function routesConfig($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    
    .state('jobList', { 
      url: '/', 
      component: 'jobList'
    })

    .state('jobDetail', { 
      url: '/jobs/detail/:id', 
      component: 'jobDetail'
    })

    .state('jobApply', { 
      url: '/jobs/apply/:id', 
      component: 'jobApply'
    })

    .state('jobApplySucess', { 
      url: '/jobs/apply-sucess', 
      component: 'jobApplySucess'
    })
}
})(); 


