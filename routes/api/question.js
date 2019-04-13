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

  Question.insertMany(req.body.options, (err, docs) => {
    if (err) return res.status(400).send(err);

    res.status(200).send({ success: true });
  });
});

router.delete("/:id", (req, res) => {
  Question.findById(req.params.id)
    .then(question =>
      question.remove().then(() => res.status(200).json({ success: true }))
    )
    .catch(err => res.status(404).json({ success: false }));
});

router.put("/:id", (req, res) => {
  Question.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    (err, question) => {
      if (err) return res.status(400).json({ msg: err.msg });
      res.status(200).send(question);
    }
  );
});

router.get("/all", (req, res) => {
  Question.find({}, (err, docs) => {
    if (err) return res.status(400).send({ msg: "Unable to find questions." });
    if (docs) {
      return res.status(200).send(docs);
    } else {
      return res.status(404).send({ msg: "No questions found" });
    }
  });
});

module.exports = router;
