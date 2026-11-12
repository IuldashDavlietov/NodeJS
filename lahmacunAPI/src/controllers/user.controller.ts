import type { RequestHandler } from "express";
import User, { UserBody, UserDocument } from "../models/user.model";
import { CustomError } from "../utils";
import type { IdParams, ListResponse, ResultResponse } from "../types/api";

const list: RequestHandler<{}, ListResponse<UserDocument>> = async (req, res) => {
    const result = await res.getModelList(User);

    res.status(200).send({
        success: true,
        details: await res.getModelListDetails(User),
        result,
    });
};

const read: RequestHandler<IdParams, ResultResponse<UserDocument>> = async (req, res) => {
    const result = await User.findById(req.params.id);

    if (!result) throw new CustomError("User is not found", 404);

    res.status(200).send({
        success: true,
        result,
    });
};

const create: RequestHandler<{}, ResultResponse<UserDocument>, UserBody> = async (req, res) => {
    const result = await User.create(req.body);

    res.status(201).send({
        success: true,
        result,
    });
    
};

const update: RequestHandler<IdParams, ResultResponse<UserDocument | null>, Partial<UserBody>>
    = async (req, res) => {
        const result = await User.findByIdAndUpdate(req.params.id, req.body, {
            returnDocument: "after",
            runValidators: true,
        });

        if (!result) throw new CustomError("User is not found", 404);

        res.status(202).send({
            success: true,
            result,
        });
    };

const remove: RequestHandler<IdParams> = async (req, res) => {
    const { deletedCount } = await User.deleteOne({ _id: req.params.id });

    if (!deletedCount) throw new CustomError("User not found or already deleted", 404);

    res.sendStatus(204);
};

export default { list, read, create, update, remove };