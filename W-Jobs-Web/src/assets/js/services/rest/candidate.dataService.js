(function () {
  'use strict';

  angular
    .module('app')
    .factory('candidateDataService', service);

  service.$inject = ['$resource','API_END_POINT'];

  function service($resource, API_END_POINT) {

    return $resource(API_END_POINT + 'candidates/:id', { id: '@Id' }, {
      search: {
        method: 'GET', 
        params: { q: 'q'},
        isArray: true
      },
      update: {
        method: 'PUT'
      }
      
    });
  }
})();