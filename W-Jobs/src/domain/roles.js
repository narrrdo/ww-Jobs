'use strict'

let mongoose = require('mongoose');
let mongooseHidden = require('mongoose-hidden')();
let deepPopulate = require('mongoose-deep-populate')(mongoose);
var capitalize = require('capitalize');
let Schema = mongoose.Schema;

var Role = new Schema({
    name: {
      en: {
        type: String,
        required: true
      },
      es: {
        type: String,
        required: true
      }
    },
    description: {
      en: {
        type: String,
        required: true,
        maxlength: 100
      },
      es: {
        type: String,
        required: true,
        maxlength: 100
      }
    },
    enabled: {
      type: Boolean,
      required: true
    },
    permissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permision'
    }]
},
{
  timestamps: true,
  toJSON: { virtuals: true }
});

Role.plugin(mongooseHidden);
Role.plugin(deepPopulate);

Role.pre('save', function (next) {

  this.name.en = capitalize(this.name.en);
  this.name.es = capitalize(this.name.es);

  this.description.en = capitalize(this.description.en);
  this.description.es = capitalize(this.description.es);

  next();
});

module.exports = mongoose.model('Role', Role);