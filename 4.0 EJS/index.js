import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 5001;

app.get("/", (req,res) =>{
    const today = new Date();
    const day = today.getDay();
    console.log(day);

    if(day >0 && day<6){
        var date = "a Weekday";
        var message = "It's time to work hard!";
    }else{
        var date = "the Weekend";
        var message = "It's time to relax!";
    }
    res.render("index.ejs",{
        dayType: date,
        advice: message
    })
})
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});