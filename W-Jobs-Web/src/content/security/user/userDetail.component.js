(function () { 'use strict';

angular
	.module('app')
	.component("userDetail", {
		templateUrl: paths.components.SECURITY_USER + "userDetail.template.html",
		controller: Controller,		
		controllerAs: "vm",
		bindings: {}
});

Controller.$inject = ['$translate', '$state', 'roleDataService', 'userDataService'];

function Controller ($translate, $state, roleDataService, userDataService) {

	var vm = this;
	
	vm.id = $state.params.id;

	vm.user = {};
	vm.roleList = {};

	vm.init = function() {

		if(vm.id) {

			vm.loadUser();

		} else {

			vm.loadRoles();
		}
		
	}

	vm.loadUser = function() {

		userDataService.get({id: vm.id}).$promise.then(function(user){
			
			vm.user = user;

			vm.loadRoles();
		});
	}

	vm.loadRoles = function() {

		roleDataService.query().$promise.then(function(roles){

			vm.roleList = roles;
		});
	}

	vm.save = function(form, user) {

		if(form.$valid)
		{
			if(!vm.id) {

				userDataService.save(user).$promise.then(function(u){

					$state.go('user');

				}).catch(function(error) {
					console.log(error);
				});

			} else {

				userDataService.update({id : vm.id },user).$promise.then(function(u){

					$state.go('user');

				}).catch(function(error) {
					console.log(error);
				});

			}

		}
	}

}
})(); 