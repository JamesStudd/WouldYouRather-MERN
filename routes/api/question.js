const express = require("express");
const router = express.Router();

// Item Model
const Question = require("./../../models/Question");

// @route   GET api/item
// @desc    Get random question
// @access  Public
router.get("/", (req, res) => {
  Question.countDocuments().exec((err, count) => {
    let random = Math.floor(Math.random() * count);

    Question.findOne()
      .skip(random)
      .exec((err, result) => {
        res.status(200).send(result);
      });
  });
});

// @route   POST api/question
// @desc    Save a question
// @access  Public
router.post("/", (req, res) => {
  if (!req.body || !req.body.options || req.body.options.count < 2)
    return res.status(400).json({ msg: "Please supply all fields." });

  const newQuestion = new Question({
    options: req.body.options,
    results: Array(req.body.options.length).fill(0)
  });

  newQuestion.save().then(question => res.json(question));
});

module.exports = router;
