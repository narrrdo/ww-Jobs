(function () { 'use strict';

angular
	.module('app')
	.component("permissionDetail", {
		templateUrl: paths.components.SECURITY_PERMISSION + "permissionDetail.template.html",
		controller: Controller,		
		controllerAs: "vm",
		bindings: {}
});

Controller.$inject = ['$translate', '$state', 'permissionDataService','toastr'];

function Controller ($translate, $state, permissionDataService, toastr) {

	var vm = this;
	
	vm.id = $state.params.id;

	vm.permission = {};

	vm.init = function() {

		if(vm.id) {

			vm.loadPermission();
		}
	}

	vm.loadPermission = function() {

		permissionDataService.get({id: vm.id}).$promise.then(function(permission){
			
			vm.permission = permission;

		});
	}

	vm.save = function(form, permission) {
		
		if(form.$valid) {

			if(!vm.id) {

				permissionDataService.save(permission).$promise.then(function(p){

					$translate('securityPermissionDetail_save_ok').then(function(msg){
						toastr.success(msg);
					});

					$state.go(components.SECURITY_PERMISSION.STATE);

				}).catch(function(error) {
						
						$translate('securityPermissionDetail_save_error').then(function(msg) {
							toastr.success(msg);
						});
				})
				
			} else {

				permissionDataService.update({ id : vm.id}, permission).$promise.then(function(p){

					$translate('securityPermissionDetail_update_ok').then(function(msg){
						toastr.success(msg);
					});

					$state.go(components.SECURITY_PERMISSION.STATE);

				}).catch(function(error) {
					
					$translate('securityPermissionDetail_update_error').then(function(msg) {
							toastr.success(msg);
						});
				});
			}
		}
	}

}
})(); 