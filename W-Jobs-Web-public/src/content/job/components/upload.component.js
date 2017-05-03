(function () { 'use strict';

	angular
		.module("app")
		.component('upload', {
			templateUrl: "src/content/job/components/upload.template.html",
			controller: Controller,		
			controllerAs: "vm",
			bindings: {
				id : "=",
				candidate : "=",
				uploader : "="
			}
	});	
			
	Controller.$inject = ['FileUploader', '$timeout','$scope','API_END_POINT','$state','$translate', 'toastr'];
			
	function Controller (FileUploader, $timeout,$scope, API_END_POINT, $state, $translate, toastr) {

		var vm = this;

		var _2MB = 2000000;
		var FILE_TYPE = "file-type";
		var FILE_SIZE = "file-size";

		vm.candidate.resume = {};
		vm.candidate.resume.toUpdate = false;
		

		vm.uploader = new FileUploader({
				url: API_END_POINT +  'public/jobs/apply',
				method : 'POST',
				formData : [vm.candidate]
			});

			vm.uploader.filters.push({
				name: FILE_TYPE,
				fn: function(item /*{File|FileLikeObject}*/, options) {
					return (item.type === "application/pdf");						
				}
			});

			vm.uploader.filters.push({
				name: FILE_SIZE,
				fn: function(item) {
					return (item.size <= _2MB);
				}
			});
		
		vm.save = function(form, candidate) {

			if(vm.uploader.queue[0]) {

				vm.uploader.queue[0].upload();
			}
		}

		vm.clickUpload = function() {

			$timeout(function() { 
					document.getElementById('uploadBtn').click();   
			},0)
		}

		vm.uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            
			if(filter.name === FILE_TYPE) {
				
				$translate('candidate_uploadResume_warning_format').then(function(msg){
					toastr.warning(msg);
				});
			}

			if(filter.name === FILE_SIZE) {
				
				$translate('candidate_uploadResume_warning_size').then(function(msg){
					toastr.warning(msg);
				});
			}
		};
			
		vm.uploader.onAfterAddingFile = function(fileItem) {

			vm.document = fileItem.file;
						
			fileItem.formData[0].toUpdateResume = true;
		};

		vm.uploader.onSuccessItem = function(fileItem, response, status, headers) {
		
			var msg = vm.id ? 'candidateDetail_update_ok' : 'candidateDetail_save_ok';

			$state.go('jobApplySucess');
		};

		vm.uploader.onErrorItem = function(fileItem, response, status, headers) {
			
			var msg = vm.id ? 'candidateDetail_update_error' : 'candidateDetail_save_error';

			$translate(msg).then(function(msg){
				toastr.error(msg);
			});
		};

	}
})(); 