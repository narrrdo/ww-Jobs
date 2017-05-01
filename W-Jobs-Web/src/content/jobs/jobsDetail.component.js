(function () { 'use strict';

	angular
		.module("app")
		.component(components.JOB_DETAIL.NAME, {
			templateUrl: paths.components.JOB_DETAIL + "jobsDetail.template.html",
			controller: Controller,		
			controllerAs: "vm",
			bindings: {}
	});	
			
	Controller.$inject = ['$state','jobDataService','toastr','$translate'];
			
	function Controller ($state, jobDataService, toastr, $translate) {

		var vm = this;

		vm.id = $state.params.id;
		vm.html = "<ul><li></li></ul>";
		vm.job = {};

		vm.init = function() {

			if(vm.id) {

				vm.loadJob();
			}
		}

		vm.loadJob = function() {

			jobDataService.get({id : vm.id}).$promise.then(function(job){

				vm.job = job;

			}).catch(function(error){
				
			});
		}

		vm.addToList = function() {

			if(!vm.job.lists) {

				vm.job.lists = new Array();
				
			} 

			vm.job.lists.push({title : '', list : vm.html})
		}

		vm.removeFromList = function(index) {

			vm.job.lists.splice(index, 1);
		}

		vm.save = function(form, job) {

			if(form.$valid) {

				if(!vm.id) {

					jobDataService.save(job).$promise.then(function(j) {

						$translate('jobDetail_save_ok').then(function(msg){
							toastr.success(msg);
						});

						$state.go(components.JOB.STATE);

					}).catch(function(error){
						
						$translate('jobDetail_save_error').then(function(msg) {
							toastr.success(msg);
						});
					});

				} else {

					jobDataService.update({id : vm.id }, job).$promise.then(function(j) {

						$translate('jobDetail_update_ok').then(function(msg){
							toastr.success(msg);
						});

						$state.go(components.JOB.STATE);

					}).catch(function(error){
						
						$translate('jobDetail_update_error').then(function(msg) {
							toastr.error(msg);
						});
					});

				}
			}
		}
	}
})(); 