angular.module('app').controller('JobListController', ['publishedJobsDataService', function(publishedJobsDataService) {

		var vm = this;
		vm.jobList = {};

		vm.init = function() {

			vm.loadJobList();
		}

		vm.loadJobList = function() {

			publishedJobsDataService.query().$promise.then(function(jobs){

				vm.jobList = jobs;
			})
		}

		vm.init();

}]);