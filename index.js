const bcrypt = require("bcrypt")
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const JWT_SECRET = "asdasd123123";
const { UserModel, TodoModel } = require("./db")
mongoose.connect("mongodb+srv://Prasanna:Prasanna%4012345@cluster0.2dzlp9d.mongodb.net/MyDB")



const app = express();
app.use(express.json());

app.post("/signup", async function(req, res){
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    const hashedPassaword =  await bcrypt.hash(password, 10);

    
    await UserModel.create({
        email:email,
        username: username,
        password:password
    })
    res.json({
        msg: "you are logged in"
    })
})

app.post("/signin", async function(req, res){
    const email= req.body.email;
    const password= req.body.password;

    const user = await UserModel.findOne({
        email: email,
        password: password
    })

    console.log(user);

    if(user){
        const token = jwt.sign({
            id: user._id
        }, JWT_SECRET);
        res.json({
            token:token
        });
    } else {
        res.status(403).json({
            msg: "incorrect credentials"
        })
    }



})

app.post("/todo", auth, function(req, res){
    const userId = req.userId;
    const title = req.body.title;

    TodoModel.create({
        title,
        userId
    })

    res.json({
        userId: userId
    })
})

app.get("/todos", auth, async function(req, res){
    const userId = req.userId;
    const todos = await TodoModel.find({
        userId: userId
    })
    

    res.json({
        
    })
})

function auth(req, res, next){
    const token = req.headers.token;

    const decodedData = jwt.verify(token, JWT_SECRET);

    if(decodedData){
        req.userId = decodedData.userId;
        next();

    } else {
        res.status(403).json({
            msg:"incorrect password"
        })
    }
}
app.listen(3000);