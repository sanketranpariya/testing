const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    quizCode: {
        type: Number,
        required: true,
    },
    questions: [{
        question: {
            type: String,
            required: true
        },
        optionA: {
            type: String,
            required: true
        },
        optionB:{
            type: String,
            required: true
        },
        optionC:{
            type: String,
            required: true
        },
        optionD:{
            type: String,
            required: true
        },
        answer:{
            type: String,
            enum: ['A', 'B', 'C', 'D'],
            required: true
        }
    }]
}, {timestamps: true})



module.exports =  mongoose.model('quiz',userSchema)
