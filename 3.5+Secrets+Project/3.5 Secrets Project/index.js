//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";  //middleware install

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3001
var userIsAuthorised = false;

app.use(bodyParser.urlencoded({extended: true}));
function secretMethod(req, res, next){
    console.log(req.body);
    if(req.body["password"] === "ILoveProgramming"){
        userIsAuthorised = true;
    }
    next();
}
app.use(secretMethod);

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/public/index.html");
})

app.post("/check", (req,res)=>{
    // there should be some response in it then only the page redirects to /check
    if(userIsAuthorised === true){
        res.sendFile(__dirname + "/public/secret.html");
        userIsAuthorised=false;
    }else{
        res.redirect("/");
        userIsAuthorised=false;
    }
    //res.send("Hello")
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});