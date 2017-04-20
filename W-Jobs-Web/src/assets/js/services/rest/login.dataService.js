(function () {
  'use strict';

  angular
    .module('app')
    .factory('loginDataService', service);

  service.$inject = ['$resource'];

  function service($resource) {

		return $resource('http://localhost:3000/token/:id', { id: '@Id' }, {
      
			token : {
				url: 'http://localhost:3000/token',
				method : 'POST',
				responseType: 'json'
			}
    });
  }
})();