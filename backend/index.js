const axios = require("axios");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
require("dotenv").config();
app.use(bodyParser.json());
const API_Key = process.env.SECRET_KEY;
const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${API_Key}`;

// read the image and return the text
async function readOCR(imageURL) {
  const requestData = {
    requests: [
      {
        image: {
          source: {
            imageUri: imageURL,
          },
        },
        features: [
          {
            type: "TEXT_DETECTION",
          },
        ],
      },
    ],
  };
  const request = {
    method: "POST",
    url: apiUrl,
    data: requestData,
  };

  let text = "";

  await axios(request)
    .then((response) => {
      const responses = response.data.responses[0];
      const textAnnotations = responses.textAnnotations[0].description;
      text = textAnnotations;
    })
    .catch((error) => {
      console.error("Error:", error.response);
    });

  return text;
}

//process text and return e-numbers alone
function processText(text) {
  const regex = /E\d{3,4}[a-zA-Z]?/g;
  const matches = text.match(regex);

  if (matches) {
    return matches;
  } else {
    return [];
  }
}

// API endpoint to return e numbers
app.post("/extract_enums", async (req, res) => {
  console.log("receive new request!");
  console.log("Process started");

  try {
    const imageUrl = req.body.image;
    const result = await readOCR(imageUrl);

    res.send(processText(result));
    res.end();
    console.log("Process finished successfully!");
  } catch (e) {
    console.log(e);
    console.log("Process failed: Error occur");
  }
});
//port number
const PORT = 9090;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
