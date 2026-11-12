import type { RequestHandler } from "express";
import Order, { OrderBody, OrderDocument } from "../models/order.model";
import { CustomError } from "../utils";
import type { IdParams, ListResponse, ResultResponse } from "../types/api";

const list: RequestHandler<{}, ListResponse<OrderDocument>> = async (req, res) => {
    const result = await res.getModelList(Order);

    res.status(200).send({
        success: true,
        details: await res.getModelListDetails(Order),
        result,
    });
};

const read: RequestHandler<IdParams, ResultResponse<OrderDocument>> = async (req, res) => {
    const result = await Order.findById(req.params.id);

    if (!result) throw new CustomError("Order is not found", 404);

    res.status(200).send({
        success: true,
        result,
    });
};

const create: RequestHandler<{}, ResultResponse<OrderDocument>, OrderBody> = async (req, res) => {
    const result = await Order.create(req.body);

    res.status(201).send({
        success: true,
        result,
    });
};

const update: RequestHandler<IdParams, ResultResponse<OrderDocument | null>, Partial<OrderBody>>
    = async (req, res) => {
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
    const { deletedCount } = await Order.deleteOne({ _id: req.params.id });

    if (!deletedCount) throw new CustomError("Order is not found or already deleted", 404);

    res.sendStatus(204);
};

export { list, read, create, update, remove };