(function () { 'use strict';

	angular
		.module("app")
		.component(components.JOB_MODAL_SOCIAL_NETWORK.NAME, {
			templateUrl: paths.components.JOB_MODAL_SOCIAL_NETWORK + "socialNetwork.template.html",
			controller: Controller,		
			controllerAs: "vm",
			bindings: {
				jobId : "="
			}
	});	
			
	Controller.$inject = ['jobDataService'];
			
	function Controller (jobDataService) {

		var vm = this;


		vm.init = function() {

		}

		vm.publish = function(social) {

			jobDataService[social]({id : vm.jobId}).$promise.then(function(resp){

				console.log(resp);

			}).catch(function(error){
				console.log(error);
				alert(error);
			});
		}

	}
})(); 