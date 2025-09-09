import express from "express";
import {
  createUser,
  handleLogin,
  getUser,
  getAccount,
} from "../controllers/userController.js";
import { getProduct } from "../controllers/productController.js";
import { auth } from "../middleware/auth.js";
import { delay } from "../middleware/delay.js";

const routerAPI = express.Router();

routerAPI.all("/", auth);

routerAPI.get("/", (req, res) => {
  return res.status(200).json("Hello world api");
});

routerAPI.post("/register", createUser);
routerAPI.post("/login", handleLogin);

routerAPI.get("/user", getUser);
routerAPI.get("/product", getProduct);
routerAPI.get("/account", delay, getAccount);

export default routerAPI;
