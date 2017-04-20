(function () { 'use strict';

angular
	.module("app")
	.component("role", {
		templateUrl: paths.components.SECURITY_ROLE + "role.template.html",
		controller: Controller,		
		controllerAs: "vm",
		bindings: {}
});

Controller.$inject = ['$translate', 'roleDataService'];

function Controller ($translate, roleDataService) {

	var vm = this;
	
	vm.tableCheck = {};
	vm.roleList = {};

	vm.init = function() {

		vm.loadRoles();
	}

	vm.loadRoles = function() {

		roleDataService.query().$promise.then(function(roles){

			vm.tableCheck.reset();

			vm.roleList = roles;	

		}).catch(function(error){
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

			alert('Debe seleccionar un Rol.');

		}
	}

	vm.delete = function() {

		var list = vm.tableCheck.getCheckedItems();

		angular.forEach(list, function(value, key) {

			console.log(value);

			roleDataService.delete({id : value}).$promise.then(function(role){
					
				vm.loadRoles();

			}).catch(function(error) {
					
				alert(error);
			});
		});
	}
	
}
})(); 