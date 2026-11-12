import type { RequestHandler } from "express";
import Token, { TokenBody, TokenDocument } from "../models/token.model";
import { CustomError } from "../utils";
import type { IdParams, ListResponse, ResultResponse } from "../types/api";

const list: RequestHandler<{}, ListResponse<TokenDocument>> = async (req, res) => {
    const result = await res.getModelList(Token);

    res.status(200).send({
        success: true,
        details: await res.getModelListDetails(Token),
        result,
    });
};

const read: RequestHandler<IdParams, ResultResponse<TokenDocument>> = async (req, res) => {
    const result = await Token.findById(req.params.id);

    if (!result) throw new CustomError("Token is not found", 404);

    res.status(200).send({
        success: true,
        result,
    });
};

const create: RequestHandler<{}, ResultResponse<TokenDocument>, TokenBody> = async (req, res) => {
    const result = await Token.create(req.body);

    res.status(201).send({
        success: true,
        result,
    });
};

const update: RequestHandler<IdParams, ResultResponse<TokenDocument | null>, Partial<TokenBody>>
    = async (req, res) => {
        const result = await Token.findByIdAndUpdate(req.params.id, req.body, {
            returnDocument: "after",
            runValidators: true,
        });

        if (!result) throw new CustomError("Token is not found", 404);

        res.status(202).send({
            success: true,
            result,
        });
    };

const remove: RequestHandler<IdParams> = async (req, res) => {
    const { deletedCount } = await Token.deleteOne({ _id: req.params.id });

    if (!deletedCount) throw new CustomError("Token is not found or already deleted", 404);

    res.sendStatus(204);
};

export default { list, read, create, update, remove };