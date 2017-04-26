(function () { 'use strict';

	angular
		.module("app")
		.component("user", {
			templateUrl:  paths.components.SECURITY_USER + "user.template.html", 
			controller: Controller,		
			controllerAs: "vm",
			bindings: {}
	});

	Controller.$inject = ['userDataService','$translate','toastr'];

	function Controller (userDataService, $translate, toastr) {

		var vm = this;
		
		vm.tableCheck = {};
		vm.userList = {};

		vm.init = function() {

			vm.loadUsers();
		}

		vm.loadUsers = function() {

			userDataService.query().$promise.then(function(users){

				vm.tableCheck.reset();
				
				vm.userList = users;	
			})
		}

		vm.confirmDelete = function() {

			var list = vm.tableCheck.getCheckedItems();

			if (list.length > 0) {
				
				var resp = confirm('Confirm');

				if(resp) {

					vm.delete();
				}
			
			} else {

				$translate('securityUser_delete_warning_selectUser').then(function(msg){
					toastr.warning(msg);
				});
			}
		}

		vm.delete = function() {

			var list = vm.tableCheck.getCheckedItems();

			angular.forEach(list, function(value, key) {

				userDataService.delete({id : value}).$promise.then(function(user){
						
					$translate('securityUser_delete_ok').then(function(msg){
						toastr.success(msg);
					});

					vm.loadUsers();

				}).catch(function(error) {
						
					$translate('securityUser_delete_error').then(function(msg){
						toastr.success(msg);
					});
				});
			});
		}

	}
})(); 