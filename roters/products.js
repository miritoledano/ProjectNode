import express from "express";
import { authAdmin } from "../middelwars/auth.js";
import {
  addProduct,
  getAllProducts,
  getPtoductById,
  deleteProduct,
  updateById,
} from "../controllers/Products.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getPtoductById);
router.delete("/:id", authAdmin, deleteProduct);
router.put("/:id", authAdmin, updateById);
router.post("/",authAdmin, addProduct);

export default router;