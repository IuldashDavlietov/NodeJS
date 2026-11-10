import { RequestHandler } from "express";
import Department, { DepartmentBody, DepartmentDocument } from "../models/department.model";
import { IdParams, ListResponse, ResultResponse, DepartmentPersonnelResponse } from "../types/api";
import { CustomError } from "../utils";
import Personnel, { PersonnelDocument } from "../models/personnel.model";


// RequestHandler<Params, responseBody, RequestBody>

const list: RequestHandler<{}, ListResponse<DepartmentDocument>> = async (req, res) => {
  const result = await res.getModelList(Department);

  res.status(200).send({
    success: true,
    details: await res.getModelListDetails(Department),
    result,
  });
};

const read: RequestHandler<IdParams, ResultResponse<DepartmentDocument>> = async (req, res) => {
  const result = await Department.findById(req.params.id);

  // After this check ts knows result is not null
  if (!result) throw new CustomError("Data is not found", 404);

  res.status(200).send({
    success: true,
    result,
  });
};

const create: RequestHandler<{}, ResultResponse<DepartmentDocument>, DepartmentBody> = async (req, res) => {
  const result = await Department.create(req.body);

  res.status(201).send({
    success: true,
    result,
  });
};

const update: RequestHandler<
  IdParams,
  ResultResponse<DepartmentDocument | null>,
  Partial<DepartmentBody>
> = async (req, res) => {
  const result = await Department.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });

  if (!result) throw new CustomError("Data is not found", 404);

  res.status(202).send({
    success: true,
    result,
  });
};

const remove: RequestHandler<IdParams> = async (req, res) => {
  const { deletedCount } = await Department.deleteOne({ _id: req.params.id });

  if (!deletedCount) throw new CustomError("Data is not found or already deleted.", 404);

  res.sendStatus(204);
};

// todo: create new controller for listing all the user for specific department.

const personnels: RequestHandler<IdParams, DepartmentPersonnelResponse<PersonnelDocument>> = async (
  req,
  res,
) => {
  const result = await res.getModelList(Personnel, { departmentId: req.params.id });

  res.status(200).send({
    success: true,
    details: await res.getModelListDetails(Personnel, { departmentId: req.params.id }),
    result,
  });
};

export { list, read, create, update, remove, personnels };
