const IssueReport = require('../models/IssueReport');
const HelpRequest = require('../models/HelpRequest');

// --- Submit a new Issue Report ---
const submitIssueReport = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    // 'req.user' is available from the 'protect' middleware
    const user = req.user;

    if (!title || !description) {
      return res.status(400).json({ message: 'Please provide a title and description' });
    }

    const issue = await IssueReport.create({
      user: user._id,
      title,
      description,
    });

    res.status(201).json({ message: 'Issue report submitted successfully', issue });

  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// --- Submit a new Expert Help Request ---
const submitHelpRequest = async (req, res) => {
  try {
    const { title, description } = req.body;
    const user = req.user;

    if (!title || !description) {
      return res.status(400).json({ message: 'Please provide a title and description' });
    }

    const helpRequest = await HelpRequest.create({
      user: user._id,
      title,
      description,
      status: 'Pending', // Default status
    });

    // ** LATER **: This is where you would trigger the SMS alert
    // (e.g., call Twilio API)
    // console.log(`SMS Alert Triggered: User ${user.name} needs help. Request ID: ${helpRequest._id}`);

    res.status(201).json({ message: 'Expert help request submitted', helpRequest });

  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  submitIssueReport,
  submitHelpRequest,
};