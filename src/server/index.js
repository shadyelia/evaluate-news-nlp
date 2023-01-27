var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const fetch = require("node-fetch");
const FormData = require("form-data");

dotenv.config({ path: path.resolve(__dirname, '../../.env') })

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

app.use(express.static("dist"));
console.log(__dirname);

app.get("/", function (_, res) {
  res.sendFile("dist/index.html");
});

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});

app.post("/analysis", analysis);
function analysis(req, res) {
  const formdata = new FormData();
  formdata.append("key", process.env.API_KEY);
  formdata.append("txt", req.body.text);
  formdata.append("lang", "en");  // 2-letter code, like en es fr ...

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow"
  };

  fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions)
    .then((response) => ({
      status: response.status,
      body: response.json()
    }))
    .then(async ({ status, body }) => {
      if (status === 200) {
        const data = await body;
        res.send(data);
      }
    })
    .catch((error) => console.log("error", error));
}
