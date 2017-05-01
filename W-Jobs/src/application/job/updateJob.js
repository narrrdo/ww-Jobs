'use strict'

var mongoose = require('mongoose');
var Jobs = require('../../domain/jobs');

var _module = {};

_module.execute = function(id, job) {

	var resp = new Promise(function(resolve, reject) {

		Jobs.findById(id, {socialNetwork : 0}).exec(function(error, doc) {

			if(error) return reject(error);

			if(!doc.published && job.published) {
				
				doc.publishedDate = new Date().toISOString();
			}

			doc.title = job.title;
			doc.description = job.description;
			doc.closing = job.closing;
			doc.lists = job.lists;
			doc.published = job.published;
			doc.isOpen = job.isOpen;

			doc.save(function(error) {

				if(error) reject(error);

				resolve(doc);
			});
		});
	});

	return resp;
}

module.exports = _module;