require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const quizModel = require('./models/usermodel')
const validator = require('./middleware/validationOne')
const port = 3700

//*middleware
app.use(cors())
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

//*connection request to DB
const connectionReq = async ()=>{
    try {
        const responseDb = await  mongoose.connect(process.env.MONGO_DB_CONNECTION)
        if(responseDb){
            console.log("DB Connected");
        } else {
            console.log("Some unusual thing happened during DB Connection")
        }
        return;
    } catch (error) {
        console.log(error);
        return res.json({
            error: true,
            msg: "Some Error Occured",
            errMsg: error
        })
    }
}
connectionReq();

app.get("/", (req, res)=> {
    return res.send("Hello");
})

app.post("/r", validator, async (req,res)=>{

    if(!req.body){
        return res.json({
            error: "Body not exist"
        })
    }

    if(!req.body.questions){
        return res.json({
            error: "Array not arriverd",
            body: req.body
        })
    }

    try{
        const frontendData= req.body;
        console.log(frontendData);
        const randomNumber = ()=>{
            return Math.floor(Math.random()*8999)+1000
        }
        
        
        const madan = async ()=>{
            const rNumber = randomNumber();
            const raju = await quizModel.findOne({quizCode: rNumber})
            if(raju){
                return madan();
            }
            frontendData.quizCode = rNumber
        }
        await madan();

        const modelData = new quizModel(frontendData)
        const savedData = await modelData.save()
        return res.send(savedData)
    }
    catch(error){
        return res.status(401).json({
            error : true,
            errorMessage: error.message
        })
    }
})

app.listen( process.env.PORT || port, ()=>{
    console.log(`server is running on port : ${port}`);
})