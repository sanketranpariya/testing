require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const quizModel = require('./models/usermodel')
const validator = require('./middleware/validations')
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
        return res.status(500).json({
            error: true,
            errorMessage: error
        })
    }
}
connectionReq();


app.post("/hostquiz", validator.validation, async (req,res)=>{

    try{
        const frontendData= req.body;
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
        return res.status(200).json({
            error: false,
            quizCode: savedData.quizCode
        })
    }
    catch(error){
        return res.status(401).json({
            error : true,
            errorMessage: error.message
        })
    }
})

app.get("/getquizdata/:code",validator.validationTwo,async (req,res)=>{
    // console.log(req.params);
    const quizDoc = await quizModel.findOne({quizCode : req.params.code})
    if(!quizDoc){
        return res.status(400).json({
            error : true,
            errorMessage : "code is "
        })
    }

    const questionsArray = quizDoc.questions

    for (let i = 0; i < questionsArray.length; i++) {
        questionsArray[i].answer = undefined
    }


    // console.log(questionsArray);

     res.status(200).json({
        error : false,
        questions : questionsArray
    })
})


app.listen( process.env.PORT || port, ()=>{
    console.log(`server is running on port : ${port}`);
})