const mongoose = require("mongoose");
const uuid = require("uuid");

const pastPaperSchema = new mongoose.Schema(
  {
    paperId: { type: String, default: uuid.v4()},
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