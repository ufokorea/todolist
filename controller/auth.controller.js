const authController = {};
const jwt = require("jsonwebtoken")
// require("dotenv").config()
const JWT_SECRET_KEY = "noona";

authController.authenticate =(req,res,next) =>{
    try{
        const tokenString = req.headers.authorization;
        if (!tokenString) {
            throw new Error("invailid token")
        }
        const token = tokenString.replace("Bearer ","");
        jwt.verify(token, JWT_SECRET_KEY, (error,payload)=>{
            if(error) {
                throw new Error("invailid token") 
            }
            // res.status(200).json({status : "success", userId:payload._id})
            // console.log("auth success")
            req.userId = payload._id;
        });

        next();

    } catch (error){
        res.status(400).json({status : "fail", message : error.message})

    }
}

module.exports = authController;