const express = require("express");
const app = express();

const bodyParser = require("body-parser");
// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DATABASE
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://anu:anucoo1123@ds231537.mlab.com:31537/college-api", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("MongoDbConnected"))
  .catch((err) => console.log(err));

// app.get("/", (req, res) => {
//   res.send("hello world");
// });

// app.get("/test", function (req, res) {
//   res.send("Testing...");
// });

const news = require("./routes/news");
app.use("/news1", news);

port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port : ${port}`);
});
