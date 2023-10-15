import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "testvalue";
const yourPassword = "testvalue";
const yourAPIKey = "1f11cb9b-6147-48bd-839a-74b286eb89d8";
const yourBearerToken = "a3f5c631-7c23-4b51-a32a-3ea4756df9fd";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async(req, res) => {
  try{
    const result = await axios.get("https://secrets-api.appbrewery.com/random");
    const stringvalue = JSON.stringify(result.data)
    console.log(stringvalue)
    res.render("index.ejs", {content: stringvalue})
  }catch(error){
    res.status(404).send(error.message);
  }
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", async(req, res) => {
  try{
    const result = await axios.get("https://secrets-api.appbrewery.com/all?page=1", {
      auth:{
        username: yourUsername,
        password: yourPassword,
      }
    })
    const data = JSON.stringify(result.data);
    console.log(data)
    res.render("index.ejs", {content: data})
  }catch(error){
    res.status(404).send(error.message);
  }
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
});

app.get("/apiKey", async(req, res) => {
  try{
    const result = await axios.get("https://secrets-api.appbrewery.com/filter", {
      params: {
        score: 5,
        apiKey: yourAPIKey,
      }
    })
    const data = JSON.stringify(result.data);
    res.render("index.ejs", {content: data});
  }catch(error){
    res.status(404).send(error.message);
  }
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
});

app.get("/bearerToken", async(req, res) => {
  try{
    const result = await axios.get("https://secrets-api.appbrewery.com/secrets/1", {
      headers: {
        Authorization: `bearer ${yourBearerToken}`
      }
    })
    const data = JSON.stringify(result.data);
    res.render("index.ejs", {content: data});
  }catch(error){
    res.status(404).send(error.message);
  }
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
