'use strict'

var mongoose = require('mongoose');
var Candidates = require('../../domain/candidate');
var pdfToText = require('../../common/converters/pdfToText');
var ConflictException = require('../../common/exception/conflictException');

var _module = {};

_module.execute = function(id, canditate, file) {

	var resp = new Promise(function(resolve, reject) {

		Candidates.findById(id).exec(function(error, doc) {

			if(error) return reject(error);

			var p;

			doc.name = canditate.name;
			doc.lastName = canditate.lastName;
			doc.tel = canditate.tel;
			doc.email = canditate.email;

			if(file) {

				p = pdfToText.convert(file.buffer);

			} else {

				p = Promise.resolve();
			}

			p.then(function(resumeText) {

				var toUpdate = canditate.toUpdateResume;

				if(toUpdate) {

					doc.resume = {};
					doc.resume.file = file ? file.buffer : null;
					doc.resume.text = file ? resumeText : '';
				}
				
				doc.save(function(error){

					if(error) reject(error);

					resolve(doc);
				});
			}).catch(function(error){
			
				reject(new ConflictException(error.message));

			});
		});
	});

	return resp;
}

module.exports = _module;