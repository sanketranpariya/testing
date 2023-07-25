const validation = (req,res,next)=>{
    if(!req.body){
        return res.status(400).json({
            error: true,
            errorMessage: "Body is not there in Request"
        })
    }

    if(typeof req.body.questions === 'string'){
        return res.status(400).json({
            error: true,
            errorMessage: "Property named 'questions' in body of the request must be typeof 'Array' but recieved as 'string'"
        })
    }

    if(!req.body.questions){
        return res.status(400).json({
            error: true,
            errorMessage: "Can not find property named 'questions' in request body"
        })
    }

    if(!req.body.questions[0]){
        return res.status(400).json({
            error: true,
            errorMessage: "property named 'questions' does not contain any element or type of it is not an 'Array'" 
        })
    }

    const questionsArray = req.body.questions
    const errorArray = []

    for(let i = 0; i < questionsArray.length; i++){
        if(typeof questionsArray[i].question !== 'string'){
            errorArray.push(`questions[${i}].question is not a string`)
        }
        if(typeof questionsArray[i].optionA !== 'string'){
            errorArray.push(`questions[${i}].question is not a string`)
        }
        if(typeof questionsArray[i].optionB !== 'string'){
            errorArray.push(`questions[${i}].optionB is not a string`)
        }
        if(typeof questionsArray[i].optionC !== 'string'){
            errorArray.push(`questions[${i}].optionC is not a string`)
        }
        if(typeof questionsArray[i].optionD !== 'string'){
            errorArray.push(`questions[${i}].optionD is not a string`)
        }
        if(typeof questionsArray[i].answer !== 'string'){
            errorArray.push(`questions[${i}].answer is not a string`)
        }

        if(!questionsArray[i].question){
            errorArray.push(`questions[${i}].question is not there or empty string`)
        }

        if(!questionsArray[i].optionA){
            errorArray.push(`questions[${i}].optionA is not there or empty string`)
        }

        if(!questionsArray[i].optionB){
            errorArray.push(`questions[${i}].optionB is not there or empty string`)
        }

        if(!questionsArray[i].optionC){
            errorArray.push(`questions[${i}].optionC is not there or empty string`)
        }

        if(!questionsArray[i].optionD){
            errorArray.push(`questions[${i}].optionD is not there or empty string`)
        }

        if(!questionsArray[i].answer){
            errorArray.push(`questions[${i}].answer is not there or empty string`)
        }
    }

    if(errorArray.length > 0){
        return res.status(400).json({
            error: true,
            errorMessage: errorArray
        })
    }

    return next()
}

const validationTwo = (req,res,next) =>{
    const rCode = parseInt(req.params.code)

    if(!rCode){
        return res.status(400).json({
            error : true,
            errorMessage : "code must be a 'number'"
        })
    }
   
    if(rCode > 9999 || rCode < 1000){
        return res.status(400).json({
            error : true,
            errorMessage : "code must be in range of 1000 to 9999 both inclusive"
        })
    }
    return next()
}

module.exports = {validation , validationTwo}