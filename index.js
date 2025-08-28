const bcrypt = require("bcrypt")
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const JWT_SECRET = "asdasd123123";
const { UserModel, TodoModel } = require("./db")
// const {auth, JWT_SECRET} = require("./auth")
const { z } = require("zod")

mongoose.connect("mongodb+srv://Prasanna:Prasanna%4012345@cluster0.2dzlp9d.mongodb.net/MyDB")



const app = express();
app.use(express.json());

app.post("/signup", async function(req, res){
    const requireBody = z.object({
        email: z.string().min(3).max(100).email(),
        name: z.string().min(3).max(100),
        password: z.string().min(6).max(100)
    })
    
    
    const parseDataWithSuccess = requireBody.safeParse(req.body);

    if(!parseDataWithSuccess.success){
        res.json({
            msg:"Invalid request data"
        })
        return
    }


    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    const hashedPassword =  await bcrypt.hash(password, 10);
    console.log(hashedPassword)

    await UserModel.create({
        email:email,
        username: username,
        password:hashedPassword
    })

    res.json({
        msg: "you are signed up"
    })
})


app.post("/signin", async function(req, res){
    const email= req.body.email;
    const password = req.body.password
    

    // const isMatch = await bcrypt.compare(password, response.password)

    const response = await UserModel.findOne({
        email: email
        // password: password
        
    })
    if(!response){
        res.status(403).json({
            msg:"user does not exist"
        })
        return
    }

    const passwordMatch = await bcrypt.compare(password, response.password);

    if(passwordMatch){
        const token = jwt.sign({
            id: response._id.toString()
        }, JWT_SECRET);

        res.json({
            token
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