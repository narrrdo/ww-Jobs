'use strict'

let mongoose = require('mongoose');
let mongooseHidden = require('mongoose-hidden')();
let deepPopulate = require('mongoose-deep-populate')(mongoose);
var capitalize = require('capitalize');
let Schema = mongoose.Schema;

var Job = new Schema({
    title: {
     	type: String,
			required: true,
      maxlength: 100
    },
    description: {
     	type: String,
			required: true,
      maxlength: 1000
    },
    lists : [{
        title : {
          type: String,
          maxlength: 100
        },
        list : {
          type: String,
          maxlength: 1000
        } 
    }],
    closing : {
      type: String,
      maxlength: 1000
    },
    published: {
      type: Boolean,
      required: true
    },
		publishedDate : {
			type: Date
		},
    isOpen: {
      type: Boolean,
      required: true
    },
    socialNetwork: {
      facebook : [{
        postedDate: {type: Date} 
      }],
      linkedin : [{
        postedDate: {type: Date} 
      }]
    }
},
{
  timestamps: true,
  toJSON: { virtuals: true }
});

Job.plugin(mongooseHidden);
Job.plugin(deepPopulate);

Job.pre('save', function (next) {

  this.title = capitalize(this.title);

  next();
});

module.exports = mongoose.model('Job', Job);