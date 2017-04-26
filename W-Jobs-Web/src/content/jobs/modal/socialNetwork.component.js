(function () { 'use strict';

	angular
		.module("app")
		.component(components.JOB_MODAL_SOCIAL_NETWORK.NAME, {
			templateUrl: paths.components.JOB_MODAL_SOCIAL_NETWORK + "socialNetwork.template.html",
			controller: Controller,		
			controllerAs: "vm",
			bindings: {
				jobId : "=",
				socialNetwork : "=",
				loadFunction : "="
			}
	});	
			
	Controller.$inject = ['jobDataService','$translate','toastr'];
			
	function Controller (jobDataService, $translate, toastr) {

		var vm = this;


		vm.init = function() {

		}

		vm.publish = function(social) {

			jobDataService[social]({id : vm.jobId}).$promise.then(function(resp){

				$translate('jobDetail_publishSocialNetwork_ok').then(function(msg){
					toastr.success(msg);
				});

				vm.loadFunction();

			}).catch(function(error) {
				$translate('jobDetail_publishSocialNetwork_error').then(function(msg){
					toastr.error(msg);
				});
			});
		}

	}
})(); 