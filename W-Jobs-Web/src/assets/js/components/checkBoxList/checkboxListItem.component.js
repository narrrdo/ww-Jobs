(function () { 'use strict';

	angular
		.module("app")
		.component("checkboxListItem", {
			templateUrl: "src/assets/js/components/checkBoxList/checkboxListItem.template.html",
			controller: Controller,		
			controllerAs: "vm",
			bindings: {
				checkboxes: "=",
				itemId: "=",
				checked: "="
			}
	});

	Controller.$inject = [];

	function Controller () {

		var vm = this;

	}
})(); 