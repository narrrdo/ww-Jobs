var request = require("request");

var _module = {};

_module.post = function(message) {

	var resp = new Promise(function(resolve, reject){

		var options = { 
			method: 'POST',
			url: 'https://api.linkedin.com/v1/people/~/shares',
			qs: { format: 'json' },
			headers: { 
				'x-li-format': 'json',
				authorization: 'Bearer AQVROaNNTfoU3zsRik2R3U_bM3ffxIN2kELGDDE9z7ziKELBBn_wa0n2wbBdLuP7_2sVglNPs3wChhjRohrdcVqUjERRYOQxoRIGG8946fSGM2zCd5_R55_x4Jb7JIatA6COpBsXXquM7CPznUyTVnMvEQ7xwfUQLZgNA8Rg2qtyl778fOI',
				'content-type': 'application/json' 
			},
			body: { 
				comment: message,
				content: { 
					title: 'Node',
					description: 'Job descripcion',
					'submitted-url': 'www.wovenware.com',
					'submitted-image-url': '' 
				},
				visibility: { code: 'anyone' } 
			},
			json: true 
		};

		request(options, function (error, response, body) {
			
			if (error) return reject(error);

			resolve(body);
			console.log(body);
		});
	});

	return resp;
}

module.exports = _module;
