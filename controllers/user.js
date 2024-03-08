import { generateToken,userModel } from "../models/user.js";
import { orderValidatorForAdd } from "../models/user.js";
import bcrypt from "bcrypt"
export const addUser=async(req,res)=>{
    let {email,password,userName,role}=req.body;
    const result=await orderValidatorForAdd(req.body);
    console.log(result)
    if (result.error) {
        return res.status(400).json({
          type: "invalid data",
          message: result.error.details[0].message,
        });
      }
   
try{
    const sameUser=await userModel.findOne({email:email});
    if(sameUser)
       return res.status(409).json({type:"same user",message:"user with such emailalready exists"})
     let hashedPassword=await bcrypt.hash(password,15);
     let newUser=new userModel({email,password:hashedPassword,userName,role})
     await newUser.save();
     let token= generateToken(newUser._id,newUser.role,newUser.userName);
     
     return res.json({
        _id: newUser._id,
        userName: newUser.userName,
        token,
        email: newUser.email,
        role:newUser.role,
      });
     

}
catch(err){
    res.status(400).json({type:"invalid operation",message:"cannot add user"})
}
}

export const login=async(req,res)=>{
    let {email,password}=req.body;
    if(!email||!password)
    return res.status(404).json({type:"missing parameters",
message:"please send email user name and password"


});
try{
    const user = await userModel.findOne({ email: email });

if(!user)
return res.status(404).json({type:"no user",message:"User does not exist"})
if(!await bcrypt.compare(password,user.password))
return res.status(404).json({type:"no user",message:"user password is invalid"})
let token=generateToken(user._id,user.role,user.userName)
return res.json({
    _id: user._id,
    userName: user.userName,
    token,
    email: user.email,
    role:user.role,
  });
}
 catch(err){
    res.status(400).json({type:"invalid operation",message:"cannote sign in user"})
}}
export const getAllUsers=async(req,res)=>{
    try{
        let allUsers=await userModel.find({},"-password");
        // מביא הכול חוץ מה passowrd
        res.json(allUsers);
       
      
    }
    catch(err){
        res.status(400).json({type:"invalid operation",message:"cannot sign in user"})
    }
}
