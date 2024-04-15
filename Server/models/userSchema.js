const mongoose=require('mongoose');
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    work:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ],
    is_online:{
        type:String,
        default:"offline"
    }
})

///We are Generating Tokens

userSchema.methods.generateAuthToken=async function(){
    try{
     let Generatedtoken=jwt.sign({_id:this._id},process.env.SECRET_KEY);
     this.tokens=this.tokens.concat({token : Generatedtoken});
     await this.save();
     return Generatedtoken;

    } catch(err)
    {
        console.log(err);
    }
}








// //userSchema.pre('save',async function(next)    //it will make sure before saving the documents encrypt the passwords..
// {
//         this.password=await bcrypt.hash(this.password,12);
//         this.cpassword=await bcrypt.hash(this.cpassword,12);
// next();
// });


const User=mongoose.model('USER',userSchema);
module.exports=User;
