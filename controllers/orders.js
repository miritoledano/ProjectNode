import mongoose from "mongoose";
import { productModel } from "../models/products.js";
import { orderModel,orderValidatorForAdd} from "../models/orders.js";



export const getAllOrders = async (req, res, next) => {
    try {
        let allOrders = await orderModel.find();
        res.json(allOrders);
    } catch (err) {
        next({
            status: 400,
            type: "invalid operation",
            message: "sorry cannot get orders",
        });
    }
};



export const  getOrdertById= async (req, res) => {
  try {

      let allOrders = await orderModel.find({userId:req.user._id} )
      res.json(allOrders)

  }
  catch (err) {
      res.status(400).json({ type: "invalid operation", message: "sorry cannot get  all Orders" })
  }
}

export const deleteOrder = async (req, res) => {
  let { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id)) {
      const err = new Error("id not in right format");
      err.status = 400;
      throw err;
    }

    let order= await orderModel.findById(id);
    if (!order) {
      const err = new Error("no product with such id to delete");
      err.status = 404;
      throw err;
    }
    if (req.user.role=="ADMIN") {
      order = await orderModel.findByIdAndDelete(id);
      return res.json({ deleteOrder: order });
    }
    if (order.TheOrderHasStarted) {
      console.log("The order has started");
      res.status(400).json({ type: "invalid", message: "The order has started" });
      return;
    }
    if (order.userId != req.user._id) {
      return res.status(400).json({
        type: "not allowed",
        message: "the user is not allowed to delete this order",
      });
    }
    console.log(order)
    console.log(id);
    console.log(order.TheOrderHasStarted)
    order= await orderModel.findByIdAndDelete(id);
    return res.json(order)
  } 
  catch (err) {
res.status(400).json({type:"invalid opertion",message:"sorry cannot get cours"})
  }
};
export const addOrder= async (req, res, next) => {
  let {address,theOrderedProducts,TheOrderHasStarted,DueDate} = req.body;
const result=await orderValidatorForAdd(req.body);
console.log(result)
if (result.error) {
    return res.status(400).json({
      type: "invalid data",
      message: result.error.details[0].message,
    });
  }

  try {
    
let newOrders = new orderModel({
        address,theOrderedProducts,TheOrderHasStarted,userId:req.user._id,DueDate
        
    });

    await newOrders.save();

    return res.json(newOrders);
  } 
  catch (err) {
    err = new Error("שגיאה בתהליך הוספת המוצר");
    err.status = 500;
    return next(err);
  }
};

export const updateById = async (req, res, next) => {
  let { id } = req.params;
  
  try {
    if (!mongoose.isValidObjectId(id)) {
      const err = new Error("id not in right format");
      err.status = 400;
      throw err;
    }
    const updatedData = { ...req.body, TheOrderHasStarted: true };
    let order = await orderModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    
    if (!order) {
      const err = new Error("no order with such id");
      err.status = 404;
      throw err;
    }
  
    return res.json(order);
  } catch (err) {
    next(err);
  }
};