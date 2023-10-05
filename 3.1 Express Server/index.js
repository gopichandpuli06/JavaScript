import express from "express";

const app = express();
const port = 3000;

app.get("/", (req,res)=>{
    res.send("Hello! Hola! Namaste!");
})

app.get("/about", (req,res)=> {
    res.send("<h1>About Us</h1><p>This is about us page</p>");
})

app.get("/contact", (req,res) =>{
    res.send("<h1>Contact page</h1>"+
    "<p>This is a contact page</p>")
})

app.listen(port, () =>{
    console.log(`Server running on port ${port}.`);
})