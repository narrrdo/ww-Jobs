(function () {
  'use strict';

  angular
    .module('app')
    .factory('constantsPermissionsDataService', service);

  service.$inject = ['$resource','API_END_POINT'];

  function service($resource, API_END_POINT) {
    return $resource(API_END_POINT + 'constantsPermissions/:id', { id: '@Id' }, {
      
    });
  }
})();