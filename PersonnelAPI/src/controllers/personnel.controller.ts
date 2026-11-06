import { RequestHandler } from "express";
import Personnel, { PersonnelBody, PersonnelDocument } from "../models/personnel.model";
import { IdParams, ListResponse, ResultResponse } from "../types/api";
import { CustomError } from "../utils";

// RequestHandler<Params, responseBody, RequestBody>

const list: RequestHandler<{}, ListResponse<PersonnelDocument>> = async (req, res) => {
  const result = await res.getModelList(Personnel);

  res.status(200).send({
    success: true,
    details: await res.getModelListDetails(Personnel),
    result,
  });
};

const read: RequestHandler<IdParams, ResultResponse<PersonnelDocument>> = async (req, res) => {
  const result = await Personnel.findById(req.params.id);

  // After this check ts knows result is not null
  if (!result) throw new CustomError("Data is not found", 404);

  res.status(200).send({
    success: true,
    result,
  });
};

const create: RequestHandler<{}, ResultResponse<PersonnelDocument>, PersonnelBody> = async (req, res) => {
  const result = await Personnel.create(req.body);

  res.status(201).send({
    success: true,
    result,
  });
};

const update: RequestHandler<
  IdParams,
  ResultResponse<PersonnelDocument | null>,
  Partial<PersonnelBody>
> = async (req, res) => {
  const result = await Personnel.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });


  if (!result) throw new CustomError("Data is not found", 404);

  res.status(202).send({
    success: true,
    result,
  });
};

const remove: RequestHandler<IdParams> = async (req, res) => {
  const { deletedCount } = await Personnel.deleteOne({ _id: req.params.id });

  if (!deletedCount) throw new CustomError("Data is not found or already deleted.", 404);

  res.sendStatus(204);
};

export { list, read, create, update, remove };
