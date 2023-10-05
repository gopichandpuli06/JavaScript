import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";  //middleware install

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 4001

app.use(bodyParser.urlencoded({extended: true}));
var userdetail = "";

function loginCredcheck(req, res, next){
    console.log(req.body)
    userdetail = req.body["username"];
    next();
}

app.use(loginCredcheck)
app.get("/", (req,res) =>{
    res.sendFile(__dirname + "/dogs/login.html");
})

app.post("/dogs", (req,res) =>{
    res.render("dogdetails.ejs",{
        name: userdetail
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

