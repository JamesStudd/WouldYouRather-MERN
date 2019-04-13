const express = require("express");
const router = express.Router();

// Item Model
const Question = require("./../../models/Question");

// @route   GET api/item
// @desc    Get random question
// @access  Public
router.get("/", (req, res) => {
  Question.aggregate([{ $sample: { size: 1 } }], (err, doc) => {
    if (err) return res.status(400).send({ msg: "Failed to find questions." });
    if (doc) {
      Question.aggregate(
        [{ $match: { theme: doc[0].theme } }, { $sample: { size: 2 } }],
        (err, docs) => {
          if (err)
            return res.status(400).send({ msg: "Failed to find questions." });
          return res.status(200).send(docs);
        }
      );
    }
  });
});

// @route   POST api/question
// @desc    Save a question
// @access  Public
router.post("/", (req, res) => {
  if (!req.body || !req.body.options || !Array.isArray(req.body.options))
    return res.status(400).json({ msg: "Please supply all fields." });

  console.log(req.body.options);

  Question.insertMany(req.body.options, (err, docs) => {
    if (err) return res.status(400).send(err);

    console.log("Inserted documents");
  });
});

module.exports = router;
