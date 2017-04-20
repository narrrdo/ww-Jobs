(function () {
  'use strict';

  angular
    .module('app')
    .factory('jobDataService', service);

  service.$inject = ['$resource'];

  function service($resource) {

    return $resource('http://localhost:3000/jobs/:id', { id: '@Id' }, {
      
      update: {
        method: 'PUT'
      },
      postLinkedin: {
        method: 'post',
        url: 'http://localhost:3000/jobs/:id/linkedin',
        params: {id: '@id'}
      },
      postFacebook: {
        method: 'post',
        url: 'http://localhost:3000/jobs/:id/facebook',
        params: {id: '@id'}
      }
      
    });
  }
})();