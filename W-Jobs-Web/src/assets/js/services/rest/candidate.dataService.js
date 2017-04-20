(function () {
  'use strict';

  angular
    .module('app')
    .factory('candidateDataService', service);

  service.$inject = ['$resource'];

  function service($resource) {

    return $resource('http://localhost:3000/candidates/:id', { id: '@Id' }, {
      
      update: {
        method: 'PUT'
      }
      
    });
  }
})();