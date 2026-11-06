import type { RequestHandler } from "express";
import type { HydratedDocument, Model, QueryFilter, SortOrder } from "mongoose";
import type { ModelPopulate } from "../types/api";

type QueryObject = Record<string, unknown>;

const toQueryObject = (value: unknown): QueryObject =>
  typeof value === "object" && value !== null && !Array.isArray(value)
    ? { ...value }
    : {};

// Returns undefined when the value is not a number above zero.
const toPositiveInt = (value: unknown): number | undefined => {
  const number = parseInt(String(value));
  return number > 0 ? number : undefined;
};

// URL values are strings, mongoose wants a SortOrder.
const toSortOrder = (value: unknown): SortOrder | undefined => {
  switch (String(value).toLowerCase()) {
    case "asc":
    case "ascending":
    case "1":
      return 1;
    case "desc":
    case "descending":
    case "-1":
      return -1;
    default:
      return undefined;
  }
};

const queryHandler: RequestHandler = (req, res, next) => {
  //* Filter:
  // URL?filter[fieldName]=value1&filter[fieldName2]=value2
  const filter = toQueryObject(req.query.filter);

  //* Search:
  // URL?search[fieldName]=value1&search[fieldName2]=value2
  const search = toQueryObject(req.query.search);

  for (const key in search)
    search[key] = { $regex: search[key], $options: "i" };

  //* Sorting:
  // URL?sort[fieldName]=value1&sort[fieldName2]=value2
  const sort = toQueryObject(req.query.sort);

  const sortOptions: Record<string, SortOrder> = {};
  for (const key in sort) {
    const order = toSortOrder(sort[key]);
    if (order) sortOptions[key] = order;
  }

  //? PAGINATION:
  // URL?page=3&limit=10&skip=20

  //* Page:
  const page = toPositiveInt(req.query.page) ?? 1;

  //* Limit:
  const limit = toPositiveInt(req.query.limit) ?? 20;

  //* Skip:
  const skip = toPositiveInt(req.query.skip) ?? (page - 1) * limit;

  res.getModelList = async <T>(
    Model: Model<T>,
    populate?: ModelPopulate,
  ): Promise<HydratedDocument<T>[]> => {
    const conditions: QueryFilter<T> = { ...filter, ...search };
    const query = Model.find(conditions)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    return populate ? await query.populate([populate].flat()) : await query;
  };

  res.getModelListDetails = async <T>(Model: Model<T>) => {
    const conditions: QueryFilter<T> = { ...filter, ...search };
    const count = await Model.countDocuments(conditions);
    return {
      count,
      filter,
      search,
      page,
      skip,
      limit,
      sort,
      pages:
        count <= limit
          ? false
          : {
              previos: page > 1 ? page - 1 : false,
              current: page,
              next: page < Math.ceil(count / limit) ? page + 1 : false,
              total: Math.ceil(count / limit),
            },
    };
  };

  next();
};

export default queryHandler;