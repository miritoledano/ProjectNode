import mongoose from "mongoose";
import Joi from "joi";
import  jwt  from "jsonwebtoken";

const userSchema = mongoose.Schema({
    userName: String,
    password: String,
    email: { type: String, unique: false },
    role:{ type:String ,default : "user"}
})
export const userModel = mongoose.model("user", userSchema);
export const orderValidatorForAdd= (_user) => {
  const orderValidationSchema = Joi.object({
      userName: Joi.string().required(),
      password: Joi.string().required(),
      email:Joi.string().required(),
     
      
      

  })
  return orderValidationSchema.validate(_user);
}


export const generateToken= (_id, role, userName) => {
    let token = jwt.sign({ _id, role, userName }, process.env.SECRET_JWT, {
      expiresIn: "100h",
    });
    return token;
}