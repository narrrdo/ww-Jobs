(function () { 'use strict';

angular
	.module('app')
	.run(run);

	run.$inject = ['$rootScope','authManager','$transitions','tokenService','$state', 'permissionService'];

	function run($rootScope, authManager, $transitions, tokenService, $state, permissionService) { 

		var vm = this;
		
		$rootScope.lang = 'en';

		permissionService.load();

		authManager.checkAuthOnRefresh();
		authManager.redirectWhenUnauthenticated();
		$transitions.onStart({},hasStatePermission);
		//hasPermission.$inject = ['$transition'];

		function hasStatePermission($transition$) {

			var state = $transition$.$to();

			if(state.data) {
				
				var routePermissions = state.data.permissions;
				var containOne = state.data.containOne;

				if(!hasPermission(routePermissions, containOne)) {

					tokenService.removeToken();
					$state.go(components.LOGIN.STATE);
				}
			}
		}

		$rootScope.hasPermission = hasPermission;

		function hasPermission(permList, containOne) {

			var userPermissions = tokenService.getPermissions();
			var hasPermission = false;
			var hasPermissionCounter = 0;
			var permissoionsList;

			containOne = containOne || false;

			if(!userPermissions) return false;

			permissoionsList = (_.isArray(permList)) ? permList  : [permList];

			permissoionsList.forEach(function(item){

				if(userPermissions.indexOf(permissions[item]) != -1) {

					hasPermissionCounter++;
				}
			});

			if(permissoionsList.length === hasPermissionCounter) {

				hasPermission = true;
			}

			if(containOne && permissoionsList.length >= 1) {

				hasPermission = true;
			}

			return hasPermission;
		}

	}
})(); 