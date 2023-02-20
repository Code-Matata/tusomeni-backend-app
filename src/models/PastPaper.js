const mongoose = require("mongoose");

const pastPaperSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    images: { type: Array, required: true }, 
    year: { type: String, required: true },
    category: { type: String, required: true }, // CAT or EXAM
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('PastPaper', pastPaperSchema); 