var mongoose = require('mongoose');

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
};

// Schema stores events with title, start-date and end-date.
var eventSchema = new mongoose.Schema({
    title: String,
    start: Date,
    end: Date,
}, schemaOptions)    
var Event = mongoose.model('Event', eventSchema);
module.exports = Event;