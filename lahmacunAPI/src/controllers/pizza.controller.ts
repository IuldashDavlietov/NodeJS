import type { RequestHandler } from "express";
import Pizza, { PizzaBody, PizzaDocument } from "../models/pizza.model";
import { CustomError } from "../utils";
import type { IdParams, ListResponse, ResultResponse } from "../types/api";

const list: RequestHandler<{}, ListResponse<PizzaDocument>> = async (req, res) => {
    const result = await res.getModelList(Pizza);

    res.status(200).send({
        success: true,
        details: await res.getModelListDetails(Pizza),
        result,
    });
};

const read: RequestHandler<IdParams, ResultResponse<PizzaDocument>> = async (req, res) => {
    const result = await Pizza.findById(req.params.id);

    if (!result) throw new CustomError("Pizza is not found", 404);

    res.status(200).send({
        success: true,
        result,
    });
};

const create: RequestHandler<{}, ResultResponse<PizzaDocument>, PizzaBody> = async (req, res) => {
    const result = await Pizza.create(req.body);

    res.status(201).send({
        success: true,
        result,
    });
};

const update: RequestHandler<IdParams, ResultResponse<PizzaDocument | null>, Partial<PizzaBody>>
    = async (req, res) => {
        const result = await Pizza.findByIdAndUpdate(req.params.id, req.body, {
            returnDocument: "after",
            runValidators: true,
        });

        if (!result) throw new CustomError("Pizza is not found", 404);

        res.status(202).send({
            success: true,
            result,
        });
    };

const remove: RequestHandler<IdParams> = async (req, res) => {
    const { deletedCount } = await Pizza.deleteOne({ _id: req.params.id });

    if (!deletedCount) throw new CustomError("Pizza is not found or already deleted", 404);

    res.sendStatus(204);
};

export default { list, read, create, update, remove };