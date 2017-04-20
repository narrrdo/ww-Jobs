'use strict'

let mongoose = require('mongoose');
let mongooseHidden = require('mongoose-hidden')();
let deepPopulate = require('mongoose-deep-populate')(mongoose);
let Schema = mongoose.Schema;

var User = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        hideJSON: true
    },
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    email:   {
        type: String,
        required: true
    },
    enabled:   {
        type: Boolean,
        equired: true
    },
    locale:   {
        type: String,
        required: true,
        enum: ['es', 'en'],
        default : 'es'
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    }
},
{
  timestamps: true,
  toJSON: { virtuals: true }
});

User.plugin(mongooseHidden);
User.plugin(deepPopulate);

User.virtual('id').get(function(){
    return 'tes';
});

User.virtual('fullName').get(function(){
    return `${this.firstname} ${this.lastname}`;
});

module.exports = mongoose.model('User', User);