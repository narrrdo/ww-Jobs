(function () {
  'use strict';

  angular
    .module('app')
    .factory('headerInterceptor', service);

  service.$inject = ['$q','$location','$rootScope', 'localeService'];

  function service($q, $location, $rootScope, localeService) {
    
		var resp = {};

		resp.request = function (config) {
            
			config.headers['Accept-Language'] = localeService.getLanguage();
			
			return config || $q.when(config)
		}

		return resp;
  }
})();