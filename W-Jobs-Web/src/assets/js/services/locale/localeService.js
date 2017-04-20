(function () {
  'use strict';

  angular
    .module('app')
    .factory('localeService', service);

  service.$inject = ['$translate', '$rootScope'];

  function service($translate, $rootScope) {
    
		var resp = {};

		resp.setLanguage = function(lang) {

			$translate.use(lang);

			$rootScope.lang = lang;
		}

		resp.getLanguage = function() {
			
			return $translate.use();
		}

		return resp;
  }
})();