(function () {
  'use strict';

  angular
    .module('app')
    .factory('roleDataService', service);

  service.$inject = ['$resource','API_END_POINT'];

  function service($resource, API_END_POINT) {
    return $resource(API_END_POINT + 'roles/:id', { id: '@Id' }, {
      
      update: {
        method: 'PUT'
      }

    });
  }
})();