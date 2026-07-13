const mongoose = require('mongoose');

const issueReportSchema = new mongoose.Schema({
  // Link this report to a specific user
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: {
    type: String,
    required: [true, 'Please add a brief title'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
}, { timestamps: true });

const IssueReport = mongoose.model('IssueReport', issueReportSchema);
module.exports = IssueReport;