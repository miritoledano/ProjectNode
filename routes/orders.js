import express from "express";
import { getAllOrders,getOrdertById,updateById,deleteOrder,addOrder } from "../controllers/orders.js";
const routerP = express.Router();
import { auth, authAdmin } from "../middlwares/auth.js";

routerP.get("/", getAllOrders);
routerP.get("/:id",auth, getOrdertById);
routerP.delete("/:id",auth,deleteOrder);
routerP.put("/:id",updateById);
routerP.post("/",auth, addOrder);

export default routerP;