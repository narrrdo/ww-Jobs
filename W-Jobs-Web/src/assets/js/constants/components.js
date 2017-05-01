(function () { 'use strict';

	var components = {

		LOGIN: {
			STATE: "login",    
			NAME: "login", 
			URL: "/"},
		
		SECURITY_MAIN: { 
			STATE: "security",    
			NAME: "securityMain", 
			URL: "/security"
		},
		
		SECURITY_USER: { 
			STATE: "user",        
			NAME: "user",         
			URL: "/security/user"},
		SECURITY_USER_DETAIL: { 
			STATE: "user-detail", 
			NAME: "userDetail",   
			URL: "/security/user/detail/:id?"
		},
		
		SECURITY_ROLE: { 
			STATE: "role",        
			NAME: "role",         
			URL: "/security/role"},
		SECURITY_ROLE_DETAIL: { 
			STATE: "role-detail", 
			NAME: "roleDetail",   
			URL: "/security/role/detail/:id?"
		},
		
		SECURITY_PERMISSION: { 
			STATE: "permission", 
			NAME: "permission",   
			URL: "/security/permision"},
		SECURITY_PERMISSION_DETAIL: { 
			STATE: "permission-detail",  
			NAME: "permissionDetail",   
			URL: "/security/permision/detail/:id?"
		},

		JOB : { 
			STATE: "job",    
			NAME: "job", 
			URL: "/job"},
		JOB_DETAIL: { 
			STATE: "job-detail", 
			NAME: "jobDetail", 
			URL: "/job/detail/:id?"},
		JOB_MODAL_SOCIAL_NETWORK : { 
			NAME: "jobModalSocialNetwork"
		},
		JOB_MODAL_PREVIEW : { 
			NAME: "jobModalPreview"
		},
		JOB_MODAL_CANDIDATE : { 
			NAME: "jobModalCandidate"
		},
	
	
	CANDIDATE : { 
		STATE: "candidate",    
		NAME: "candidate", 
		URL: "/candidate"},
	CANDIDATE_DETAIL: { 
		STATE: "candidate-detail", 
		NAME: "candidateDetail", 
		URL: "/candidate/detail/:id?"
	},

	DASHBOARD : {
		STATE: "dashboard",
		NAME: "dashboard",
		URL: "/dashboard"
	}
};


	window.components = components;	

})(); 