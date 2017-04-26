(function () {
  'use strict';

  angular
    .module('app')
    .factory('jobDataService', service);

  service.$inject = ['$resource','API_END_POINT'];

  function service($resource, API_END_POINT) {

    return $resource(API_END_POINT + 'jobs/:id', { id: '@Id' }, {
      getOpenJobs: {
        method: 'GET', 
        url: API_END_POINT + 'jobs/open',
        isArray: true
      },
      getPublishedJobs: {
        method: 'GET', 
        url: API_END_POINT + 'jobs/published',
        isArray: true
      },
      update: {
        method: 'PUT'
      },
      postLinkedin: {
        method: 'post',
        url: API_END_POINT + 'jobs/:id/linkedin',
        params: {id: '@id'}
      },
      postFacebook: {
        method: 'post',
        url: API_END_POINT + 'jobs/:id/facebook',
        params: {id: '@id'}
      }
      
    });
  }
})();