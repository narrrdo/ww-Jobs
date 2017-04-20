(function () { 'use strict';

	angular
		.module("app")
		.component("user", {
			templateUrl:  paths.components.SECURITY_USER + "user.template.html", 
			controller: Controller,		
			controllerAs: "vm",
			bindings: {}
	});

	Controller.$inject = ['userDataService'];

	function Controller (userDataService) {

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

				alert('Debe seleccionar un usuario.');

			}
		}

		vm.delete = function() {

			var list = vm.tableCheck.getCheckedItems();

			angular.forEach(list, function(value, key) {

				console.log(value);

				userDataService.delete({id : value}).$promise.then(function(user){
						
					vm.loadUsers();

				}).catch(function(error) {
						
					alert(error);
				});
			});
		}

	}
})(); 