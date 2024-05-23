const User = require("../model/User");
const bcrypt = require('bcrypt');
const saltRounds = 10;


const userController = {};

userController.createUser= async (req,res)=>{
    try{
        const {name,email, password} =req.body;
        const user = await User.findOne({email});
        if(user){
            throw new Error("이미 가입한 유저입니다.")
        } 
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        console.log("hash",hash)

        const newUser = new User({name,email,password : hash});
        await newUser.save();
        res.status(200).json({status : "가입성공"});

    } catch (err) {
        res.status(400).json({status : "Fail", error : err});
    }

};

userController.loginWithEmail= async (req,res)=>{
    try{
        const {email, password} =req.body;    
        const user = await User.findOne({email},"-createdAt -updatedAt -__v");
        if(user) {
            const isMatch = bcrypt.compareSync(password, user.password); 
            if(isMatch) {
                const token = user.generateToken();
                return res.status(200).json({status : "success", user, token})
            }
        }        

        throw new Error ("아이디 또는 비번과 일치하지 않습니다.")

    } catch (err) {
        res.status(400).json({status : "Fail", message : err.message});
    }        
}

userController.getUser =async (req,res) =>{
    try{
        const {userId} = req;
        // console.log(userId)
        const user = await User.findOne({_id : userId});
        // console.log(user)  
        if(!user){
            throw new Error("cant find user")
        }
        // console.log("final")
        res.status(200).json({status : "final success", user})


    } catch (err) {
        res.status(400).json({status : "Fail2", message : err.message});
    }          
}

module.exports = userController;