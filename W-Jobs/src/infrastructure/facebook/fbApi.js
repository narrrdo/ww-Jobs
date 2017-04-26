let FB = require('fb');
let authentication = require('./authentication');


let _module = {};

_module.sendPost = function(message) {

	var resp = new Promise(function(resolve, reject){

		authentication.execute().then(function(token){

			let tt = "EAACEdEose0cBAL5hMVw73kim69Q4yPl7GAvtro2ZBYV0JPnBOTjBDFKCGP1vZAGjWepVArW848I19ZC8ZAzFSQWZBitueY1dBT619XBZAZCmVbKKnJfzXkoDhiShCrZCNDa7wFsctTyIbWG3of2yBBcLDmrwjKVvxKTlg023kE2yNasIznbPRQrw4LJQP7fO6hsZD";
                
			FB.setAccessToken(tt);

			let body = {
				message: message,
				link : "http://www.wovenware.com/"
			}

			FB.api('me/feed', 'post', body, function (res) {

				if(!res || res.error) {
					console.log(!res ? 'error occurred' : res.error);
					return reject(res.error);
				}

				resolve();
			});

		}).catch(function(error) {
				
				console.log(error);
				reject(error);
		});
	});

	return resp;
}

module.exports = _module;


