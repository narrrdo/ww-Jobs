(function () {
  'use strict';

  angular
    .module('app')
    .factory('tokenService', service);

  service.$inject = ['localStorageService','jwtHelper','authManager'];

  function service(localStorageService, jwtHelper, authManager) {

		var vm = this;
		var resp = {};

		resp.setFullToken = function(fullToken) {

			var token = fullToken.token;
			var refreshToken = fullToken.refreshToken;

			var pppp = localStorageService.set('token', token);
			var tttt = localStorageService.set('refreshToken', refreshToken);
		}

		resp.getToken = function() {

			return localStorageService.get('token');
		}

		resp.removeToken = function() {

			localStorageService.clearAll();
			authManager.unauthenticate();
		}

		resp.getExpirationDate = function() {

			return jwtHelper.getTokenExpirationDate(resp.getToken());
		}

		resp.getLocale = function() {

			var decoded = jwtHelper.decodeToken(resp.getToken());

			var locale = decoded.locale;
			
			return locale;

		}

		resp.getPermissions = function() {
		
			var decoded = jwtHelper.decodeToken(resp.getToken());

			return decoded.role.permissions;
		}

		return resp;
  }
})();