(function () {
  'use strict';

  angular
    .module('app')
    .factory('roleDataService', service);

  service.$inject = ['$resource'];

  function service($resource) {
    return $resource('http://localhost:3000/roles/:id', { id: '@Id' }, {
      
      update: {
        method: 'PUT'
      }

    });
  }
})();