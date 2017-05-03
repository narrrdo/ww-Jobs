//(function () { 
	//'use strict';

	angular
		.module("app")
		.component('jobApply', {
			templateUrl: "src/content/job/jobApply.template.html",
			controller: Controller,		
			controllerAs: "vm",
			bindings: {
				
			}
	});	
			
	Controller.$inject = ['publishedJobsDataService', '$state', 'FileUploader', 'applyJobDataService', '$translate'];
			
	function Controller (publishedJobsDataService, $state, FileUploader, applyJobDataService, $translate) {

		var vm = this;
		vm.id = $state.params.id;
		vm.job = {};
		vm.candidate = {};
		vm.uploader = new FileUploader();

		vm.init = function() {

			vm.loadPublishedJobdDetail();
		}

		vm.loadPublishedJobdDetail = function() {

			publishedJobsDataService.get({id : vm.id}).$promise.then(function(job){

				vm.job = job;
				vm.candidate.jobId = job.id;
			})
		}

		vm.save = function(form, candidate) {

			if(form.$valid) {

				if(vm.uploader.queue[0]) {

					vm.uploader.queue[0].upload();

				} else {

					applyJobDataService.save(vm.candidate).$promise.then(function(doc){

						$state.go('jobApplySucess');

					}).catch(function(error){
						
						$translate('candidateDetail_save_error').then(function(msg) {
							toastr.success(msg);
						});
					});
				}
			}
		}

	}
// })(); 