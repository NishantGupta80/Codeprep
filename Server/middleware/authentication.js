const jwt=require("jsonwebtoken");
const User=require("../models/userSchema");

const authentication= async (req,res,next) => {
    try{
        const token=req.cookies.jwtoken;
        console.log(token);
        const verifyToken=jwt.verify(token,process.env.SECRET_KEY);
        console.log(verifyToken);
         const rootUser=await User.findOne({_id:verifyToken._id,"tokens.token":token});
         if(!rootUser)
         {
            throw new Error('User Not Found')
         }
         req.token=token;
         req.rootUser=rootUser;
         rootUser.userID=rootUser._id;
         next();
    } 
    catch(err)
    {
        console.log(err);
        res.send(err);  
    }
 }
 module.exports=authentication;