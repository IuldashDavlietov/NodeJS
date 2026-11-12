import type { RequestHandler } from "express";
import Topping, { ToppingBody, ToppingDocument } from "../models/topping.model";
import { CustomError } from "../utils";
import type { IdParams, ListResponse, ResultResponse } from "../types/api";

const list: RequestHandler<{}, ListResponse<ToppingDocument>> = async (req, res) => {
    const result = await res.getModelList(Topping);

    res.status(200).send({
        success: true,
        details: await res.getModelListDetails(Topping),
        result,
    });
};

const read: RequestHandler<IdParams, ResultResponse<ToppingDocument>> = async (req, res) => {
    const result = await Topping.findById(req.params.id);

    if (!result) throw new CustomError("Topping is not found", 404);

    res.status(200).send({
        success: true,
        result,
    });
};

const create: RequestHandler<{}, ResultResponse<ToppingDocument>, ToppingBody> = async (req, res) => {
    const result = await Topping.create(req.body);

    res.status(201).send({
        success: true,
        result,
    });
};

const update: RequestHandler<IdParams, ResultResponse<ToppingDocument | null>, Partial<ToppingBody>>
    = async (req, res) => {
        const result = await Topping.findByIdAndUpdate(req.params.id, req.body, {
            returnDocument: "after",
            runValidators: true,
        });

        if (!result) throw new CustomError("Topping is not found", 404);

        res.status(202).send({
            success: true,
            result,
        });
    };

const remove: RequestHandler<IdParams> = async (req, res) => {
    const { deletedCount } = await Topping.deleteOne({ _id: req.params.id });

    if (!deletedCount) throw new CustomError("Topping is not found or already deleted", 404);

    res.sendStatus(204);
};

export default { list, read, create, update, remove };