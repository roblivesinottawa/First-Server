const express = require("express");
const router = express.Router();

const News = require("../models/News");

// 1. Save News
router.post("/save", (req, res) => {
  const newNews = new News({
    headline: req.body.subject,
    description: req.body.description,
    department: req.body.department,
    imageUrl: req.body.imageUrl,
  });
  newNews
    .save()
    .then((news) => res.json(news))
    .catch((err) => res.json(err));
});

// 2. Get All News
router.get("/get-all", (req, res) => {
  News.find()
    .then((news) => res.json(news))
    .catch((err) => res.status(404).json({ noNewsFound: "No News Found " }));
});

// 3.Get News by Id
router.get("/get/:id", (req, res) => {
  News.findById(req.params.id)
    .then((news) => res.json(news))
    .catch((err) =>
      res.status(404).json({ noNewsFound: "No News Found with that ID" })
    );
});

// 4. Get by Dept
router.post("/get-by-dept", (req, res) => {
  let dept = req.body.department;
  News.find({ department: dept })
    .then((news) => res.json(news))
    .catch((err) => res.status(404).json({ noNewsFound: "No news found" }));
});

// 5. Edit Notice
router.post("/edit/:id", (req, res) => {
  let newData = {
    headline: req.body.subject,
    description: req.body.description,
    department: req.body.department,
    iamgeUrl: req.body.iamgeUrl,
  };
  News.findOneAndUpdate(
    { _id: req.params.id },
    { $set: newData },
    { new: true }
  )
    .then((news) => res.json(news))
    .catch((err) => console.log(err));
});

// 6. Delete News by
router.delete("/delete/:id", (req, res) => {
  News.findById(req.params.id)
    .then((news) => {
      news.remove().then(() => res.json({ success: true }));
    })
    .catch((err) => res.status(404).json({ success: false }));
});

// Delete All
router.delete("/delete-all", (req, res) => {
  News.deleteMany()
    .then((data) => res.send({ success: true }))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
