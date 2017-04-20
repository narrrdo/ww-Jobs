let FB = require('fb');

//fb = new FB.Facebook(options);

let _module = {};

_module.execute = function() {

	let resp = new Promise(function(resolve, reject){

		FB.api('oauth/access_token', {
			client_id: '264967197274426',
			client_secret: '18f2cb5720880088dbd73ea22df27f0a',
			grant_type: 'client_credentials'
		}, function (res) {

				if(!res || res.error) {
						console.log(!res ? 'error occurred' : res.error);

						reject(res.error);
						
						return;
				}
		
				let accessToken = res.access_token;

				//console.log(accessToken);

				resolve(accessToken);
		});
	});

	return resp;
}

module.exports = _module;

