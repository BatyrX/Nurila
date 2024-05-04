const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  grade: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  semester: { 
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Grade', gradeSchema);
