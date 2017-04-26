(function () {
  'use strict';

  angular
    .module('app')
    .factory('loginDataService', service);

  service.$inject = ['$resource','API_END_POINT'];

  function service($resource, API_END_POINT) {

		return $resource(API_END_POINT + 'token/:id', { id: '@Id' }, {
      
			token : {
				url: API_END_POINT + 'token',
				method : 'POST',
				responseType: 'json'
			}
    });
  }
})();