'use strict'

let mongoose = require('mongoose');
let mongooseHidden = require('mongoose-hidden')();
let deepPopulate = require('mongoose-deep-populate')(mongoose);
var capitalize = require('capitalize');
let Schema = mongoose.Schema;

var Candidate = new Schema({
    name: {
        type: String,
        required: true,
				maxlength: 50
  	},
    lastName: {
        type: String,
        required: true,
        maxlength: 50
		},
    tel: { 
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    resume : {
      file : {
        type: Buffer
      },
      text : {
        type: String,
      }
    }
},
{
  timestamps: true,
  toJSON: { virtuals: true }
});

Candidate.plugin(mongooseHidden);
Candidate.plugin(deepPopulate);

Candidate.virtual('fullName').get(function() {

    return `${this.name} ${this.lastName}`;
});

Candidate.pre('save', function (next) {

  this.name = capitalize(this.name);

  next();
});

module.exports = mongoose.model('Candidate', Candidate);