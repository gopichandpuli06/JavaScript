import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 4000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Step 1: Make sure that when a user visits the home page,
//   it shows a random activity.You will need to check the format of the
//   JSON data from response.data and edit the index.ejs file accordingly.
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  console.log("helo", req.body);

  // Step 2: Play around with the drop downs and see what gets logged.
  try{
    /*var type = req.body.type;
    var participants = req.body.participants
    console.log(type)
    console.log(participants)
    const resp = await axios.get(
      `https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`
      );
    const respResults = resp.data;
    console.log(respResults)
    res.render("index.ejs", {
      data: respResults[Math.floor(Math.random * respResults.length)]
    });*/

    console.log(req.body);
    const type = req.body.type;
    const participants = req.body.participants;
    const response = await axios.get(
      `https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`
    );
    const result = response.data;
    console.log(result.length);
    res.render("index.ejs", {
      data: result[Math.floor(Math.random() * result.length)],
    });
  }catch(error){
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: "No activites that match your criteria"
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
