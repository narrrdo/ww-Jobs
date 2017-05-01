(function () { 'use strict';

angular
	.module("app")
	.component("validationFormAlert", {
		templateUrl: paths.components.VALIDATION_FORM_ALERT + "validationFormAlert.template.html",
		controller: Controller,		
		controllerAs: "vm",
		bindings: {
			isSubmitted : "=",
			showError : "="
		}
});

Controller.$inject = ['$translate'];

function Controller ($translate) {

	var vm = this;
	vm.errorList =  new Array();

	var MIN_LENGTH = "form_validation_error_minlength_";
	var ID_EXISTS  = "form_validation_error_idExists_";
	var REQUIRED   = "form_validation_error_required_";
	var EMAIL      = "form_validation_error_email_";
	var MASK       = "form_validation_error_mask_";
	var MAX_SIZE   = "form_validation_error_maxSize_";

	vm.showError = function(form) {

		if(vm.isSubmitted) {

			vm.errorList = new Array();

			// Required
			angular.forEach(form.$error.required, function(value, key) 
			{
				var text = $translate.instant(REQUIRED + value.$name);
				vm.errorList.push(text);
			});

			// Email validation
			angular.forEach(form.$error.email, function(value, key) 
			{
				var text = $translate.instant(EMAIL + value.$name);
				vm.errorList.push(text);
			});
			
			// Min Length validation
			angular.forEach(form.$error.minlength, function(value, key) 
			{
				var text = $translate.instant(MIN_LENGTH + value.$name);
				vm.errorList.push(text);
			});

			// Mask
			angular.forEach(form.$error.mask, function(value, key) 
			{
				var text = $translate.instant(MASK + value.$name);
				vm.errorList.push(text);
			});
		}
	}
	

}
})(); 