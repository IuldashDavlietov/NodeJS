import type { RequestHandler } from "express";
import { mongoose } from "../configs/dbConnection";
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
    if (!mongoose.isValidObjectId(req.params.id)) {
        throw new CustomError("Invalid user ID format", 400);
    }

    const result = await User.findById(req.params.id);
    if (!result) throw new CustomError("User is not found", 404);

    // Regular users can only view their own profile (IDOR protection)
    const isOwner = String(result._id) === String(req.user?._id);
    if (!req.user?.isAdmin && !isOwner) {
        throw new CustomError("NoPermission: You can only view your own profile.", 403);
    }

    res.status(200).send({
        success: true,
        result,
    });
};

const create: RequestHandler<{}, ResultResponse<UserDocument>, UserBody> = async (req, res) => {
    // Prevent privilege escalation: only existing admins can set isAdmin
    const userPayload: UserBody = req.user?.isAdmin
        ? req.body
        : { ...req.body, isAdmin: false };

    const result = await User.create(userPayload);

    res.status(201).send({
        success: true,
        result,
    });
};

const update: RequestHandler<IdParams, ResultResponse<UserDocument | null>, Partial<UserBody>>
    = async (req, res) => {
        if (!mongoose.isValidObjectId(req.params.id)) {
            throw new CustomError("Invalid user ID format", 400);
        }

        // Fail-Fast: verify ownership before hitting the database
        const isOwner = String(req.params.id) === String(req.user?._id);
        if (!req.user?.isAdmin && !isOwner) {
            throw new CustomError("NoPermission: You can only update your own profile.", 403);
        }

        // Strip privileged fields for non-admin updates (Mass Assignment protection)
        const updatePayload: Partial<UserBody> = { ...req.body };
        if (!req.user?.isAdmin) {
            delete updatePayload.isAdmin;
        }

        const result = await User.findByIdAndUpdate(req.params.id, updatePayload, {
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
    if (!mongoose.isValidObjectId(req.params.id)) {
        throw new CustomError("Invalid user ID format", 400);
    }

    const { deletedCount } = await User.deleteOne({ _id: req.params.id });

    if (!deletedCount) throw new CustomError("User not found or already deleted", 404);

    res.sendStatus(204);
};

export { list, read, create, update, remove };