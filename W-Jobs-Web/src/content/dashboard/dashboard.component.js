(function () { 'use strict';

	angular
		.module("app")
		.component(components.DASHBOARD.NAME, {
			templateUrl: paths.components.DASHBOARD + "dashboard.template.html",
			controller: Controller,		
			controllerAs: "vm",
			bindings: {}
	});	
			
	Controller.$inject = ['jobDataService'];
			
	function Controller (jobDataService) {

		var vm = this;
	
		vm.openJobList = {};
		vm.publishedJobList = {};

		vm.init = function() {

			vm.loadOpenJobs();
			vm.loadPublishedJobs();
		}

		vm.loadOpenJobs = function() {

			var query = {isOpened : true};

			jobDataService.getOpenJobs().$promise.then(function(docs){

				vm.openJobList = docs;

			}).catch(function(error){
				alert(error);
			});
		}

		vm.loadPublishedJobs = function() {

			jobDataService.getPublishedJobs().$promise.then(function(docs){

				vm.publishedJobList = docs;

			}).catch(function(error){
				alert(error);
			});

		}


	}
})(); 