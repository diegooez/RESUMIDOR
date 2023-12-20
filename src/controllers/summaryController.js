const Summary = require('../models/summaryModel');
const { summarizeText } = require('../utils/textSummarizer');

const createSummary = async (req, res) => {
  const { originalText, userName } = req.body;

  try {
    const summarizedText = summarizeText(originalText);

    const newSummary = new Summary({
      originalText,
      summarizedText,
      userName,
    });

    await newSummary.save();
    res.status(201).json(newSummary);
  } catch (error) {
    console.error('Error creating summary:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createSummary };
