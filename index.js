const express = require("express");
const { UserModel, TodoModel } = require("./db")

const app = express();
app.use(express.json());

app.post("/signup", function(rq, res){
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    
    UserModel.insert({
        email:email,
        pasword:password,
        name:name
    })
    res.json({
        msg: "you are logged in"
    })
})

app.post("/signin", function(req, res){
    const email= req.body.email;
    const password= req.body.password;

    if(user){
        const token = "";
        res.json({
            
        })
    }



})

app.post("/todo", function(req, res){

})

app.get("/todos", function(req, res){

})

app.listen(3000);