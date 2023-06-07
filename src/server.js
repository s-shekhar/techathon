var express = require("express");
var cors = require("cors");
var app = express();
var search = require("./search.js");

app.use(cors());

app.get("/search", async function (req, res, next) {
  console.log("Searching....");
  if (!req.query.q) {
    res.json({ error: "Seach query missing" });
    return;
  }
  const query = req.query.q;
  console.log(query);
  const data = await search.search(query);
  console.log([...data]);
  res.json([...data]);
});

app.listen(8080, function () {
  console.log("CORS-enabled web server listening on port 8080");
});
