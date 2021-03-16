const express = require('express');
const fs = require('fs');
// const path = require("path");
const mongoose = require("mongoose");
const db = require('./models')

const landingTemplate = require("./landingtemplate.js")
const addtemplate = require("./addtemplate.js")

mongoose.connect("mongodb+srv://brat:booba@cluster0.lfuba.mongodb.net/fakeusersdb?retryWrites=true&w=majority",
{useNewUrlParser: true, useUnifiedTopology: true },
      (err)=>{
    if(err)throw err;
    console.log("mongo connected n running...")
})


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

app.get('/users',async(req,res)=>{
    // fs.readFile("users.json",'utf8',(err,content)=>{
    //     if(err)throw err;
    //     res.end(content)
    // })
    let users = await db.User.find()
    console.log(users)
    res.json(users)
})


app.get('/users/:username',async (req,res,next)=>{
    // if(isNaN(req.params.id))next()
    // fs.readFile("users.json",'utf8',(err,content)=>{
    //     if(err)throw err;
    //     console.log(content)
    //      let data = JSON.parse(content);
    //          console.log(req.params.id)
    //          console.log(data)
    //      let user = data.filter(u=>u.id == req.params.id)[0];
    //         console.log(user)
    //         res.end(JSON.stringify(user))
    // })

    let user = await db.User.findOne({username:req.params.username})
        res.json({user})
})


app.get("/adduser",(req,res)=>{
    res.send(addtemplate)
})


app.post('/adduser',async (req,res,next)=>{
    console.log(req.body);
    let isValid = true;
    for(let i in req.body){
        if(req.body[i] === ""){
            isValid = false;
            res.end("invalid field values")
        }
    }
    if(isValid){
        let user = await db.User.create(req.body)
        res.send(`thank you!!<a href=/users/new/${user._id}>See your user</a> <a href="/">Home</a>`)
    // fs.readFile("users.json",(err,content)=>{
    //     if(err)throw err;
    //     let data = JSON.parse(content);
    //     let user = {id:data.length+1,...req.body}
    //     console.log(user)
    //     data.push(user);
    //     fs.writeFile("users.json",JSON.stringify(data),(err)=>{
    //         if(err)throw err;
    //         console.log("file was updated")
    //         res.send(`thank you! <a href=/users/${user.id}>See your entry!</a>`)

    //     })
    // })

}
})

app.get("/populate",(req,res)=>{
    populateDB();
    res.end('cloudDB populated...we hope')
})


app.get('/users/new/:id',async(req,res)=>{
    res.json(await db.User.findOne({_id:req.params.id}))
})


app.use(errorHandler)


function errorHandler(req,res,next){
    console.log("lousy urlPath");
    res.redirect('/');
}

let users = require("./users.json")
console.log(users)

function populateDB(){
    users = users.map(u=>({...u,age:parseInt(u.age),balance:parseInt(u.balance)}))
    console.log(users)
    users.forEach(u=>{
        db.User.create(u)
        .then(dbuser=>{
            console.log('user was created!')
        })
    })
}






app.listen(PORT,console.log(`api server is logged onto port ${PORT}.`))