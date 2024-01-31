
import Joi from "joi";
import mongoose from "mongoose";
// import { productSchema } from "products.";

const minimalPrudactSchema = mongoose.Schema({
  CountProduct:Number,
  name:String,
  code:String

});


const orderSchema =mongoose.Schema({
  DueDate:Date,
  address:String,
  theOrderedProducts: [minimalPrudactSchema],
orderDate:Date,
  TheOrderHasStarted:Boolean ,
  userId:String

});


export const orderModel = mongoose.model("order", orderSchema);
export const orderValidatorForAdd= (_order) => {
  const orderValidationSchema = Joi.object({
      orderDate: Joi.date().default(Date.now()),
      
      DueDate: Joi.date().default(Date.now()),
      address:Joi.string().required(),
      theOrderedProducts: Joi.array().items(Joi.object({
        CountProduct: Joi.number(),
        name: Joi.string(),
        code: Joi.string()
    })).required().min(1).message("At least one order detail is required"),
      TheOrderHasStarted:Joi.boolean().required(),
     
      

  })
  return orderValidationSchema.validate(_order);
}

