(function () {
  'use strict';

  angular
    .module('app')
    .factory('userDataService', service);

  service.$inject = ['$resource','API_END_POINT'];

  function service($resource, API_END_POINT) {
    return $resource(API_END_POINT + 'users/:id', { id: '@Id' }, {
      
      update: {
        method: 'PUT'
      }

    });
  }
})();