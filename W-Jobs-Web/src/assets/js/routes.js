(function () { 'use strict';

angular
  .module('app')
  .config(routesConfig);

routesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function routesConfig($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    
    // Securuty
    .state(components.LOGIN.STATE, { 
      url: components.LOGIN.URL, 
      component: components.LOGIN.NAME
    })

    .state(components.SECURITY_MAIN.STATE, { 
      url: components.SECURITY_MAIN.URL, 
      component: components.SECURITY_MAIN.NAME,
      data : { permissions : ['SECURITY_MAIN'] }
    })

    .state(components.SECURITY_USER.STATE, { 
      url: components.SECURITY_USER.URL, 
      component: components.SECURITY_USER.NAME,
      data : { permissions : ['USER_GET_ALL'] }
    })

    .state(components.SECURITY_USER_DETAIL.STATE, { 
      url: components.SECURITY_USER_DETAIL.URL, 
      component: components.SECURITY_USER_DETAIL.NAME,
      data : { permissions : ['USER_GET_DETAILS'] }
    })

    .state(components.SECURITY_ROLE.STATE, { 
      url: components.SECURITY_ROLE.URL, 
      component: components.SECURITY_ROLE.NAME,
      data : { permissions : ['ROLE_GET_ALL'] }
    })

    .state(components.SECURITY_ROLE_DETAIL.STATE, { 
      url: components.SECURITY_ROLE_DETAIL.URL, 
      component: components.SECURITY_ROLE_DETAIL.NAME,
      data : { permissions : ['ROLE_GET_DETAILS'] }
    })

    .state(components.SECURITY_PERMISSION.STATE, { 
      url: components.SECURITY_PERMISSION.URL, 
      component: components.SECURITY_PERMISSION.NAME,
      data : { permissions : ['PERMISSION_GET_ALL'] }
    })

    .state(components.SECURITY_PERMISSION_DETAIL.STATE, { 
      url: components.SECURITY_PERMISSION_DETAIL.URL, 
      component: components.SECURITY_PERMISSION_DETAIL.NAME,
      data : { permissions : ['PERMISSION_GET_DETAILS'] }
    })

    // Jobs
    .state(components.JOB.STATE, { 
      url: components.JOB.URL, 
      component: components.JOB.NAME,
      data : { permissions : ['JOB_GET_ALL'] }
    })

    .state(components.JOB_DETAIL.STATE, { 
      url: components.JOB_DETAIL.URL, 
      component: components.JOB_DETAIL.NAME,
      data : { permissions : ['JOB_GET_DETAILS'] }
    })

    // Candidates
    .state(components.CANDIDATE.STATE, { 
      url: components.CANDIDATE.URL, 
      component: components.CANDIDATE.NAME,
      data : { permissions : ['CANDIDATES_GET_ALL'] }
    })
    
    .state(components.CANDIDATE_DETAIL.STATE, { 
      url: components.CANDIDATE_DETAIL.URL, 
      component: components.CANDIDATE_DETAIL.NAME,
      data : { permissions : ['CANDIDATES_GET_DETAILS'] }
    })

    .state(components.DASHBOARD.STATE, { 
      url: components.DASHBOARD.URL, 
      component: components.DASHBOARD.NAME, 
      data : { permissions : ['DASHBOARD'] }
    })

    .state('tables', { 
      url: '/tables', 
      templateUrl: 'templates/tables.html'
    });
}
})(); 


