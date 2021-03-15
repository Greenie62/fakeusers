const express = require('express');
const fs = require('fs');
const path = require("path");

const landingTemplate = require("./landingtemplate.js")
const addtemplate = require("./addtemplate.js")


const app = express();
const PORT = process.env.PORT || 3005;


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers","origin, x-requested-with, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","GET POST OPTIONS")
    next()
})

app.get("/",(req,res)=>{
    // res.write("Welcome to Justins Fake users API")
    res.send(landingTemplate);
})

app.get('/users',(req,res)=>{
    fs.readFile("users.json",'utf8',(err,content)=>{
        if(err)throw err;
        res.end(content)
    })
})


app.get('/users/:id',(req,res,next)=>{
    if(isNaN(req.params.id))next()
    fs.readFile("users.json",'utf8',(err,content)=>{
        if(err)throw err;
        console.log(content)
        // res.end("temp")
         let data = JSON.parse(content);
        //     console.log(req.params.id)
             console.log(data)
         let user = data.filter(u=>u.id == req.params.id)[0];
            console.log(user)
            res.end(JSON.stringify(user))
    })
})


app.get("/adduser",(req,res)=>{
    res.send(addtemplate)
})


app.post('/adduser',(req,res,next)=>{
    console.log(req.body);
    let isValid = true;
    for(let i in req.body){
        if(req.body[i] === ""){
            isValid = false;
            res.end("invalid field values")
        }
    }
    if(isValid){
    fs.readFile("users.json",(err,content)=>{
        if(err)throw err;
        let data = JSON.parse(content);
        let user = {id:data.length+1,...req.body}
        console.log(user)
        data.push(user);
        fs.writeFile("users.json",JSON.stringify(data),(err)=>{
            if(err)throw err;
            console.log("file was updated")
            res.send(`thank you! <a href=/users/${user.id}>See your entry!</a>`)

        })
    })

}
})


app.use(errorHandler)


function errorHandler(req,res,next){
    console.log("lousy urlPath");
    res.redirect('/');
}





app.listen(PORT,console.log(`api server is logged onto port ${PORT}.`))