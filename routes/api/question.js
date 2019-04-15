const express = require("express");
const router = express.Router();
const auth = require("./../../middleware/auth");

// Item Model
const Question = require("./../../models/Question");
let themes = [];

const getThemes = () => {
  themes = [];
  Question.find({}, (err, docs) => {
    if (err) return err;
    if (docs) {
      docs.forEach(doc => {
        if (!themes.includes(doc.theme.toLowerCase())) {
          themes.push(doc.theme.toLowerCase());
        }
      });
    }
  });
};
getThemes();

// @route   GET api/item
// @desc    Get random question
// @access  Public
router.get("/", (req, res) => {
  const theme = themes[Math.floor(Math.random() * themes.length)];
  Question.aggregate(
    [
      { $match: { theme: { $regex: new RegExp(theme, "i") } } },
      { $sample: { size: 2 } }
    ],
    (err, docs) => {
      if (err)
        return res.status(400).send({ msg: "Failed to find questions." });

      if (docs && docs.length >= 2) {
        let arr = [docs[0]._id, docs[1]._id];
        return res.status(200).send(docs);
      } else {
        return res.status(404).json({ msg: "Failed to find questions" });
      }
    }
  );
});

// @route   POST api/question
// @desc    Save a question
// @access  Public
router.post("/", auth, (req, res) => {
  if (!req.body || !req.body.options || !Array.isArray(req.body.options))
    return res.status(400).json({ msg: "Please supply all fields." });

  Question.insertMany(req.body.options, (err, docs) => {
    if (err) return res.status(400).send(err);

    req.body.options.forEach(option => {
      if (!themes.includes(option.theme)) themes.push(option.theme);
    });

    res.status(200).send({ success: true });
  });
});

router.post("/delete", auth, (req, res) => {
  if (!req.body) return res.status(400).json({ success: false });

  Question.deleteMany({ _id: { $in: req.body } }, (err, response) => {
    if (err) return res.status(400).json({ success: false });

    getThemes();
    return res.status(200).json({ success: true });
  });
});

router.get("/reset", auth, (req, res) => {
  Question.updateMany(
    {},
    { timesPicked: 0, timesShown: 0 },
    (err, response) => {
      if (err) return res.status(400).json({ msg: err.msg });

      return res.status(200).json({ success: true });
    }
  );
});

router.put("/:id", auth, (req, res) => {
  Question.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    (err, question) => {
      if (err) return res.status(400).json({ msg: err.msg });
      res.status(200).send(question);
    }
  );
});

router.post("/pick", (req, res) => {
  Question.findByIdAndUpdate(
    req.body.pickedId,
    { $inc: { timesShown: 1, timesPicked: 1 } },
    (err, question) => {
      if (err) return res.status(400).json({ msg: err.msg });

      Question.findByIdAndUpdate(
        req.body.otherId,
        { $inc: { timesShown: 1 } },
        (err, response) => {
          if (err) return res.status(400).json({ msg: err.msg });

          return res.status(200).json({ success: true });
        }
      );
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
