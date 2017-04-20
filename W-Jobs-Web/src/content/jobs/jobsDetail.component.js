(function () { 'use strict';

	angular
		.module("app")
		.component(components.JOB_DETAIL.NAME, {
			templateUrl: paths.components.JOB_DETAIL + "jobsDetail.template.html",
			controller: Controller,		
			controllerAs: "vm",
			bindings: {}
	});	
			
	Controller.$inject = ['$state','jobDataService'];
			
	function Controller ($state, jobDataService) {

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
				alert(error);
			});
		}

		vm.save = function(form, job) {

			if(form.$valid) {

				if(!vm.id) {

					jobDataService.save(job).$promise.then(function(j) {

						console.log(j);
						$state.go(components.JOB.STATE);

					}).catch(function(error){
						alert(error);
					});

				} else {

					jobDataService.update({id : vm.id }, job).$promise.then(function(j) {

						console.log(j);
						$state.go(components.JOB.STATE);

					}).catch(function(error){
						alert(error);
					});

				}
			}
		}
	}
})(); 