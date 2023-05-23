const express = require("express");
const app = express();
const fs = require("fs");
const request = require("request");
const path = require("path");
const { PORT } = require("./config.js");
const { API_KEY } = require("./config.js");

url =
  "https://pixabay.com/api/?key=" + API_KEY + "&image_type=photo&per_page=200";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status", res.statusCode);
    } else {
      console.log(data);
      const newData = JSON.stringify(data);
      fs.writeFile(
        "./frontend/static/js/views/liste-complete.json",
        newData,
        (err) => {
          if (err) throw err;
          console.log("success");
        }
      );
    }
  }
);
// res.end("Success");

app.get("/ticker=:id", function (req, res) {
  const ticker = req.params.id;
  var url = "";
  console.log(ticker);

  url =
    "https://pixabay.com/api/?key=" +
    API_KEY +
    "&q=" +
    ticker +
    "&image_type=photo";
  // const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol='+ticker+'&interval=5min&apikey='+API_KEY;

  // https://pixabay.com/api/?key=36461742-9c20803c029541cce17aa3881&q=yellow+flowers&image_type=photo

  // const url = 'https://api.openweathermap.org/data/2.5/weather?lat=14&lon=50&appid='+API_KEY;

  request.get(
    {
      url: url,
      json: true,
      headers: { "User-Agent": "request" },
    },
    (err, res, data) => {
      if (err) {
        console.log("Error:", err);
      } else if (res.statusCode !== 200) {
        console.log("Status", res.statusCode);
      } else {
        console.log(data);
        const newData = JSON.stringify(data);
        fs.writeFile(ticker + ".json", newData, (err) => {
          if (err) throw err;
          console.log("success");
        });
      }
    }
  );
  res.end("Success");
});

app.use(
  "/static",
  express.static(path.resolve(__dirname, "frontend", "static"))
);

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

app.get("/ticker-result=:id", function (req, res) {
  const ticker = req.params.id;
  fs.readFile(__dirname + "/" + ticker + ".json", "utf8", function (err, data) {
    res.send(JSON.parse(data));
  });
});
app.listen(PORT || 4001, () => {
  console.log("Server running on port", PORT);
});
