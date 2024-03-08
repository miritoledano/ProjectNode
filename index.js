import express from "express";
import router from "./routes/products.js";
import { config } from "dotenv";
import { connectToDB } from "./db/connectToDB.js";
import cors from "cors";
import userRouter from "./routes/user.js";
import routerP from "./routes/orders.js"

import { errorHandling } from "./middlwares/erroreHndling.js";
// import userRouter from "./routes/user.js"

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("files"));

app.use("/api/product", router);
app.use("/api/user",userRouter)
app.use("/api/order",routerP);
connectToDB();
config();

app.use(errorHandling )

let port = process.env.PORT || 3500;
app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
