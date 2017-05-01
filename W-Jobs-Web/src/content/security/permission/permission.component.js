(function () { 'use strict';

angular
	.module("app")
	.component("permission", {
		templateUrl: paths.components.SECURITY_PERMISSION + "permission.template.html",
		controller: Controller,		
		controllerAs: "vm",
		bindings: {}
});

Controller.$inject = ['permissionDataService', 'localeService','$rootScope','$translate','toastr'];

function Controller (permissionDataService, localeService, $rootScope, $translate, toastr) {

	var vm = this;
	
	vm.permissionList = {};
	vm.tableCheck = {};


	vm.init = function() {

		vm.loadPermission();
	}

	vm.loadPermission = function() {

		permissionDataService.query().$promise.then(function(permissions){

			vm.tableCheck.reset();
			
			vm.permissionList = permissions;	

		}).catch(function(error) {
			console.log(error);
		});
	}

	vm.confirmDelete = function() {

		var list = vm.tableCheck.getCheckedItems();

		if (list.length > 0) {
			
			var resp = confirm('Confirm');

			if(resp) {

				vm.delete();
			}
		
		} else {

			toastr.warning($translate.instant('securityPermission_delete_warning_selectPermission'));
		}
	}

	vm.delete = function() {

		var list = vm.tableCheck.getCheckedItems();

		angular.forEach(list, function(value, key) {

			permissionDataService.delete({id : value}).$promise.then(function(permission){
					
				toastr.success($translate.instant('securityPermission_delete_ok'));
				
				vm.loadPermission();

			}).catch(function(error) {
					
				toastr.error($translate.instant('securityPermission_delete_error'));
			});
		});
	}

}
})(); 