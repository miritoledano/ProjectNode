
import Joi from "joi";
import mongoose from "mongoose";

const ProductsSchema =mongoose.Schema ({
   name:String,
   Providercode: String,
    code: String,
    Discribe:String,
    DateOfProduction:Date,
    ImagePath: String

});





export const productModel = mongoose.model("product",ProductsSchema );
export const orderValidatorForAdd= (_product) => {
    const orderValidationSchema = Joi.object({
        name: Joi.string().required(),
        code: Joi.string().required(),
        Discribe:Joi.string().required(),
       
        
        
  
    })
    return orderValidationSchema.validate(_product);
  }
  