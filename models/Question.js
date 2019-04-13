const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  scenario: {
    type: String,
    required: true,
    unique: true
  },
  theme: {
    type: String,
    required: true
  },
  timesShown: {
    type: Number,
    default: 0
  },
  timesPicked: {
    type: Number,
    default: 0
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Question = mongoose.model("question", QuestionSchema);
