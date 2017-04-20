(function () {
  'use strict';

  angular
    .module('app')
    .factory('constantsPermissionsDataService', service);

  service.$inject = ['$resource'];

  function service($resource) {
    return $resource('http://localhost:3000/constantsPermissions/:id', { id: '@Id' }, {
      
    });
  }
})();