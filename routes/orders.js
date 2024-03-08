import express from "express";
import { getAllOrders,getOrdertById,updateById,deleteOrder,addOrder } from "../controllers/orders.js";
const routerP = express.Router();
import { auth, authAdmin } from "../middlwares/auth.js";

routerP.get("/", getAllOrders);
routerP.get("/:id",auth, getOrdertById);
routerP.delete("/:id",auth,deleteOrder);
routerP.put("/:id",authAdmin,updateById);
 routerP.post("/",auth, addOrder);
//  routerP.post("/", addOrder);


export default routerP;
