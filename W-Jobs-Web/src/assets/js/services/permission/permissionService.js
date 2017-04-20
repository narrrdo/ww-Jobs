(function () {
  'use strict';

  angular
    .module('app')
    .factory('permissionService', service);

  service.$inject = ['localStorageService','constantsPermissionsDataService'];

  function service(localStorageService, constantsPermissionsDataService) {

		var vm = this;
		var obj = {};

		obj.load = function() {

			var permList = localStorageService.get('permissions');

			if(window.permissions && permList) return;

			if(!window.permissions && permList) {

				window.permissions = permList;
				return;
			} 
			
			constantsPermissionsDataService.get().$promise.then(function(permList) {
				localStorageService.set('permissions', permList);
				window.permissions = permList;
			});
			
		}

		return obj;
  }
})();