(function () { 'use strict';

	var content_base = "src/content/";
	var template_base = "src/template/";
	var generic_base = "src/assets/js/components/";

	var paths = {

		components: {
			
			// Templates
			DIVIDER_LINE : template_base + "dividerLine/",
			HEADER_BAR : template_base + "headerBar/",
			PAGE_TITLE : template_base + "pageTitle/",
			SIDE_BAR : template_base + "sideBar/",
			
			// Generic Components
			CHECKBOX_LIST : generic_base + "checkBoxList/",
			CANCE_OK_BUTTON : generic_base + "cancelOKButton/",
			VALIDATION_FORM_ALERT: generic_base + "validationFormAlert/",
			PAGE_TOP_BAR: generic_base + "pageTopBar/",
			BAR_SECTION: generic_base + "pageTopBar/",

			// LogIn
			LOGIN : content_base + "login/",

			// Content
			SECURITY_MAIN : content_base + "security/main/",
			SECURITY_USER : content_base + "security/user/",
			SECURITY_ROLE : content_base + "security/role/",
			SECURITY_PERMISSION : content_base + "security/permission/",
			
			// Jobs
			JOB : content_base + "jobs/",
			JOB_DETAIL : content_base + "jobs/",
			JOB_MODAL_SOCIAL_NETWORK : content_base + "jobs/modal/",
			JOB_MODAL_PREVIEW : content_base + "jobs/modal/",
			JOB_MODAL_CANDIDATE : content_base + "jobs/modal/",

			// Candidates
			CANDIDATE : content_base + "candidate/",
			CANDIDATE_DETAIL : content_base + "candidate/",

			// Dashboard
			DASHBOARD : content_base + "dashboard/"
		}	
	};

	window.paths = paths;	

})(); 