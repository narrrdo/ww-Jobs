(function () { 'use strict';

	angular
		.module("app")
		.component(components.JOB.NAME, {
			templateUrl: paths.components.JOB + "jobs.template.html",
			controller: Controller,		
			controllerAs: "vm",
			bindings: {}
	});	
			
	Controller.$inject = ['jobDataService'];
			
	function Controller (jobDataService) {

		var vm = this;
		
		vm.tableCheck = {};
		vm.jobList = {};

		vm.init = function() {

			vm.loadJobs();
		}

		vm.loadJobs = function() {

			jobDataService.query().$promise.then(function(jobs) {

				vm.tableCheck.reset();

				vm.jobList = jobs;	

			}).catch(function(error) {
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

				alert('Debe seleccionar un Job.');

			}
		}

		vm.delete = function() {

			var list = vm.tableCheck.getCheckedItems();

			angular.forEach(list, function(value, key) {

				console.log(value);

				jobDataService.delete({id : value}).$promise.then(function(job){
						
					vm.loadJobs();

				}).catch(function(error) {
						
					alert(error);
				});
			});
		}

	}
})(); 