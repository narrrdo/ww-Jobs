(function () { 'use strict';

angular
	.module('app')
	.component("roleDetail", {
		templateUrl: paths.components.SECURITY_ROLE + "roleDetail.template.html",
		controller: Controller,		
		controllerAs: "vm",
		bindings: {}
});

Controller.$inject = ['$translate', '$state', 'roleDataService', 'permissionDataService','toastr'];

function Controller ($translate, $state, roleDataService, permissionDataService, toastr) {

	var vm = this;
	
	vm.id = $state.params.id;

	vm.tableCheck = {};
	vm.role = {};
	vm.permissionList = {};

	vm.init = function() {

		if(vm.id) {

			vm.loadRole();

		} else {

			vm.loadPermission();
		}
		
	}

	vm.loadRole = function() {

		roleDataService.get({id: vm.id}).$promise.then(function(role){
			
			vm.role = role;

			vm.loadPermission();
		});
	}

	vm.loadPermission = function() {

		permissionDataService.query().$promise.then(function(permissions){

			vm.permissionList = permissions;
		});
	}

	vm.save = function(form, role) {

		if(form.$valid) {
			
			var permissionList = vm.tableCheck.getCheckedItems();

			role.permissions = permissionList;

			if(!vm.id) {

				roleDataService.save(role).$promise.then(function(r) {

					$translate('securityRoleDetail_save_ok').then(function(msg){
						toastr.success(msg);
					});

					$state.go(components.SECURITY_ROLE.STATE);

				}).catch(function(error) {
					
					$translate('securityRoleDetail_save_error').then(function(msg) {
						toastr.success(msg);
					});
				});
			} else {

				roleDataService.update({id : vm.id}, role).$promise.then(function(r) {

					$translate('securityRoleDetail_update_ok').then(function(msg){
						toastr.success(msg);
					});

					$state.go(components.SECURITY_ROLE.STATE);

				}).catch(function(error) {
					
					$translate('securityRoleDetail_update_error').then(function(msg){
						toastr.success(msg);
					});
				});
			}
		}
	}

	vm.getPermissionState = function(id) {

		var resp = false;

		if(vm.id) {
			
			var list = vm.role.permissions;

			if(list.length > 0) {

				list.forEach(function(item){

					if(item.id === id) {

						resp = true;
					}
				});
			} 
		}
		return resp;
	}

}
})(); 