angular
	.module("app")
	.component("pageTitle", {
		templateUrl: paths.components.PAGE_TITLE + "pageTitle.template.html",
		bindings: {
			title: "<" 
		},
		controllerAs: "vm",
		controller: function Controller () {

			var vm = this;
			//vm.title = 'Test';
	}
});