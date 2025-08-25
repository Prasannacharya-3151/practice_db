const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "asdasd123123";
const { UserModel, TodoModel } = require("./db")
// mongoose.connect("")
const mongoose = require("mongoose")


const app = express();
app.use(express.json());

app.post("/signup", async function(req, res){
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    
    await UserModel.create({
        email:email,
        password:password,
        username: username
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
        });
        res.json({
            token:token
        })
    } else {
        res.status(403).json({
            msg: "incorrect credentials"
        })
    }



})

app.post("/todo", function(req, res){

})

app.get("/todos", function(req, res){

})

app.listen(3000);