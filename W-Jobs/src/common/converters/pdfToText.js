'use strict'

var pdfText = require('pdf-text');
var ConflictException = require('../../common/exception/conflictException');

var _module = {};

_module.convert = function(buffer) {

	var resp = new Promise(function(resolve, reject){

		pdfText(buffer, function(err, chunks) {

				if(err) reject(new ConflictException(err));

				var text = chunks.join('');

				resolve(text);
    });
	});

	return resp;
}

module.exports = _module;