const mongoose = require("mongoose");

const pastPaperSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    images: { type: Array, required: true }, 
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('PastPaper', pastPaperSchema); 