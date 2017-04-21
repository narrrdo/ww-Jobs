'use strict'

var mongoose = require('mongoose');
var Candidates = require('../../domain/candidate');
var pdfToText = require('../../common/converters/pdfToText');

var _module = {};

_module.execute = function(id, canditate, file) {

	var resp = new Promise(function(resolve, reject) {

		Candidates.findById(id).exec(function(error, doc) {

			if(error) return reject(error);

			doc.name = canditate.name;
			doc.lastName = canditate.lastName;
			doc.tel = canditate.tel;
			doc.email = canditate.email;

			if(file) {

				pdfToText.convert(file.buffer).then(function(resumeText){

					doc.resume = {};
					doc.resume.file = file.buffer;
					doc.resume.text = resumeText;

					doc.save(function(error){

						if(error) reject(error);

						resolve(doc);
					});
				});
			} else {

				doc.save(function(error) {

					if(error) reject(error);

					resolve(doc);
				});
			}
			
		});
	});

	return resp;
}

module.exports = _module;