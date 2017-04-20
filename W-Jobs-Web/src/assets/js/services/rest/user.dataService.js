(function () {
  'use strict';

  angular
    .module('app')
    .factory('userDataService', service);

  service.$inject = ['$resource'];

  function service($resource) {
    return $resource('http://localhost:3000/users/:id', { id: '@Id' }, {
      
      update: {
        method: 'PUT'
      }

    });
  }
})();