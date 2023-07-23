const validation = (req,res,next)=>{
    if(!req.body){
        return res.send("Error :Body is not there in request")
    }
    return next()
}

module.exports = validation