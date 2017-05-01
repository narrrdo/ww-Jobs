(function () { 
	'use strict';

	angular
		.module("app")
		.component('jobDetail', {
			templateUrl: "content/job/jobDetail.template.html", 
			controller: Controller,		
			controllerAs: "vm",
			bindings: {
				
			}
	});	
			
	Controller.$inject = ['publishedJobsDataService', '$state'];
			
	function Controller (publishedJobsDataService, $state) {

		var vm = this;
		vm.id = $state.params.id;
		vm.job = {};

		vm.init = function() {

			vm.loadPublishedJobdDetail();
		}

		vm.loadPublishedJobdDetail = function() {

			publishedJobsDataService.get({id : vm.id}).$promise.then(function(job){

				vm.job = job;
			})
		}

	}
})(); 