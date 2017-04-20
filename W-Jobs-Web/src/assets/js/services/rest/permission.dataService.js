(function () {
  'use strict';

  angular
    .module('app')
    .factory('permissionDataService', service);

  service.$inject = ['$resource'];

  function service($resource) {

    return $resource('http://localhost:3000/permissions/:id', { id: '@Id' }, {
      
      update: {
        method: 'PUT'
      }
      
    });
  }
})();