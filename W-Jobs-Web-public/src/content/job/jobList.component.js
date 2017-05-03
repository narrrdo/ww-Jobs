(function () { 
	'use strict';

	angular
		.module("app")
		.component('jobList', {
			templateUrl: "src/content/job/jobList.template.html",
			controller: Controller,
			controllerAs: "vm",
			bindings: {
				
			}
	});	
			
	Controller.$inject = ['publishedJobsDataService'];
			
	function Controller (publishedJobsDataService) {

		var vm = this;
		vm.jobList = {};

		vm.init = function() {

			vm.loadPublishedJobs();
		}

		vm.loadPublishedJobs = function() {

			publishedJobsDataService.query().$promise.then(function(jobs){

				vm.jobList = jobs;
			})
		}

	}
})(); 