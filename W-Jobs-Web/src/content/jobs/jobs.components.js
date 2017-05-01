(function () { 'use strict';

	angular
		.module("app")
		.component(components.JOB.NAME, {
			templateUrl: paths.components.JOB + "jobs.template.html",
			controller: Controller,		
			controllerAs: "vm",
			bindings: {}
	});	
			
	Controller.$inject = ['jobDataService', '$translate','toastr'];
			
	function Controller (jobDataService, $translate, toastr) {

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

				$translate('job_delete_warning_selectJob').then(function(msg){
					toastr.warning(msg);
				});
			}
		}

		vm.delete = function() {

			var list = vm.tableCheck.getCheckedItems();

			angular.forEach(list, function(value, key) {

				jobDataService.delete({id : value}).$promise.then(function(job){
						
					$translate('job_delete_ok').then(function(msg){
						toastr.success(msg);
					});

					vm.loadJobs();

				}).catch(function(error) {
						
					$translate('securityJob_delete_error').then(function(msg){
						toastr.error(msg);
					});
				});
			});
		}

	}
})(); 