import type { RequestHandler } from "express";
import { mongoose } from "../configs/dbConnection";
import Order, { OrderBody, OrderDocument } from "../models/order.model";
import { CustomError } from "../utils";
import type { IdParams, ListResponse, ResultResponse } from "../types/api";
import Pizza from '../models/pizza.model'

const list: RequestHandler<{}, ListResponse<OrderDocument>> = async (req, res) => {
    const customFilter = req.user?.isAdmin ? {} : { userID: req.user?._id };

    const result = await res.getModelList(Order, customFilter);

    res.status(200).send({
        success: true,
        details: await res.getModelListDetails(Order, customFilter),
        result,
    });
};

const read: RequestHandler<IdParams, ResultResponse<OrderDocument>> = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        throw new CustomError("Invalid order ID format", 400);
    }

    const result = await Order.findById(req.params.id);
    if (!result) throw new CustomError("Order is not found", 404);

    const isOwner = String(result.userId) === String(req.user?._id);
    if (!req.user?.isAdmin && !isOwner) {
        throw new CustomError("NoPermission: You can only view your own orders.", 403);
    }

    res.status(200).send({
        success: true,
        result,
    });
};

const create: RequestHandler<{}, ResultResponse<OrderDocument>, OrderBody> = async (req, res) => {

    const pizzaId = req.body.pizzaId;
    const pizza = await Pizza.findById(pizzaId).lean();
    if (!pizza) throw new CustomError("Pizza you look for is not found", 404);

  const orderPayload: OrderBody = {
    ...req.body,
    price: pizza.price,
    userId: req.user?.isAdmin && req.body.userId ? req.body.userId : req.user!._id
  }

    const result = await Order.create(orderPayload);
    res.status(201).send({
        success: true,
        result,
    });
};

const update: RequestHandler<IdParams, ResultResponse<OrderDocument | null>, Partial<OrderBody>>
    = async (req, res) => {
        if (!mongoose.isValidObjectId(req.params.id)) {
            throw new CustomError("Invalid order ID format", 400);
        }

        const result = await Order.findByIdAndUpdate(req.params.id, req.body, {
            returnDocument: "after",
            runValidators: true,
        });

        if (!result) throw new CustomError("Order is not found", 404);

        res.status(202).send({
            success: true,
            result,
        });
    };

const remove: RequestHandler<IdParams> = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        throw new CustomError("Invalid order ID format", 400);
    }

    const { deletedCount } = await Order.deleteOne({ _id: req.params.id });

    if (!deletedCount) throw new CustomError("Order is not found or already deleted", 404);

    res.sendStatus(204);
};

export { list, read, create, update, remove };