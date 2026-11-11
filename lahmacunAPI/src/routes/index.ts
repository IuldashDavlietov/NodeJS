
import { Router } from "express";
import authRouter from "./auth";
import userRouter from "./user";
import tokenRouter from "./token";
import orderRouter from "./order";
import pizzaRouter from "./pizza";
import toppingRouter from "./topping";
import documentRouter from "./document";

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
