const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const cors=require('cors');
const authentication=require("../middleware/authentication");
const OpenAi=require("openai");
const app=express();
app.use(express.json()); 
app.use(cors());

////////////////////////////////////////////////////////////////////////   using Promises

// router.post("/register", (req, res) => {
//     const {name ,email ,phone ,work ,password , cpassword}=req.body;
//     if(!name || !email || !phone || !work || !password || !cpassword)
//     return res.status(420).json({error:"Please Fill all the Fileds Properly"});

// User.findOne({email:email})
//     .then((userExist)=>{
//         if(userExist)
//         return res.status(422).json({error:"Email Already Registered"});
//     const user = new User({name,email,phone,work,password,cpassword});
//     user.save().then(()=>{
//         res.status(201).json({message:"User Registered successfully"});
//     }).catch((err)=>{
//         res.status(500).json({error:"Failed to register"});
//     })
// }).catch((err)=>{
//     console.log(err);
// })
// });

router.post('/signup', async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  if (!name || !email || !phone || !work || !password || !cpassword)
    return res
      .status(420)
      .json({ error: "Please Fill all the Fileds Properly" });

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist)
      return res.status(422).json({ message: "Email Already Registered" });
    if (password != cpassword) {
      return res
        .status(402)
        .json({ message: "Confirm Passwords Doesn't match" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });

      //Encryption of PASSSWORDS

      const userCreated = await user.save();

      if (userCreated) {
        res.status(201).json({ message: "User Registered successfully" });
      } else {
        res.status(500).json({ message: "Failed to Registered" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email && password) {
      const userLogin = await User.findOne({ email: email });
      if (userLogin) {
       const  isMatch = password==userLogin.password;
        const token = await userLogin.generateAuthToken();
        console.log(token);

        res.cookie("jwtoken",token,{
          expires:new Date(Date.now() + 25892000000),
          httpOnly:true
        });

        if (isMatch) {
          return res.status(200).json({ error: "login successfull", name:userLogin.name, email:userLogin.email });
        } else {
          return res.status(400).json({error: "Wrong Password!!" });
        }
      } else return res.status(400).json({ error: "Email Not Registered" });
    } else return res.status(400).json({ error: "Please Fill the data" });
  } catch (err) {
    console.log(err);
  }
});

router.get("/getUsers", async (req,res)=>{
  const userData=User.find();
  res.status(200).json(await userData);
})



module.exports = router;
