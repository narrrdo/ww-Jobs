'use strict'

var mongoose = require('mongoose');
var Jobs = require('../../domain/jobs');

var _module = {};

_module.execute = function(id, job){

	var resp = new Promise(function(resolve, reject){

		Jobs.findById(id).exec(function(error, doc){

			if(error) return reject(error);

			doc.title = job.title;
			doc.description = job.description;
			doc.closing = job.closing;
			doc.lists = job.lists;
			doc.published = job.published;

			if(!doc.publishedDate && job.published) {
				
				doc.publishedDate = new Date().toISOString();
			}

			doc.save(function(error){

				if(error) reject(error);
			});

			resolve(doc);
		});
	});

	return resp;
}

module.exports = _module;