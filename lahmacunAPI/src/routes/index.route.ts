
import { Router } from "express";
import authRouter from "./auth.route";
import userRouter from "./user.route";
import tokenRouter from "./token.route";
import orderRouter from "./order.route";
import pizzaRouter from "./pizza.route";
import toppingRouter from "./topping.route";
import documentRouter from "./document.route";

const router = Router();
// ROUTER INDEX:

// URL: /

// auth:
router.use("/auth", authRouter);

// user:
router.use("/users", userRouter);

// token:
router.use("/tokens", tokenRouter);

// order:
router.use("/orders", orderRouter);

// pizza:
router.use("/pizzas", pizzaRouter);

// topping:
router.use("/toppings", toppingRouter);

// document:
router.use("/documents", documentRouter);

export default router;
