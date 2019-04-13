const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  options: {
    type: [String],
    required: true,
    minlength: 2
  },
  results: {
    type: [Number],
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Question = mongoose.model("question", QuestionSchema);
