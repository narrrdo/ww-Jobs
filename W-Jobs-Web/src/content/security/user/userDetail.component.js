(function () { 'use strict';

angular
	.module('app')
	.component("userDetail", {
		templateUrl: paths.components.SECURITY_USER + "userDetail.template.html",
		controller: Controller,		
		controllerAs: "vm",
		bindings: {}
});

Controller.$inject = ['$translate', '$state', 'roleDataService', 'userDataService','toastr'];

function Controller ($translate, $state, roleDataService, userDataService, toastr) {

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

					$translate('securityUserDetail_save_ok').then(function(msg){
						toastr.success(msg);
					});

					$state.go('user');

				}).catch(function(error) {

					$translate('securityUserDetail_save_error').then(function(msg) {
						toastr.success(msg);
					});
				});

			} else {

				userDataService.update({id : vm.id },user).$promise.then(function(u){

					$translate('securityUserDetail_update_ok').then(function(msg){
						toastr.success(msg);
					});

					$state.go('user');

				}).catch(function(error) {
					
					$translate('securityUserDetail_update_error').then(function(msg) {
						toastr.success(msg);
					});
				});
			}
		}
	}

}
})(); 