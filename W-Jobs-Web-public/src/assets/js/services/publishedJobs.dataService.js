(function () {
  'use strict';

  angular
    .module('app')
    .factory('publishedJobsDataService', service);

  service.$inject = ['$resource','API_END_POINT'];

  function service($resource, API_END_POINT) {
    return $resource(API_END_POINT + 'public/jobs/published/:id', { id: '@Id' }, {
      
      update: {
        method: 'PUT'
      }

    });
  }
})();