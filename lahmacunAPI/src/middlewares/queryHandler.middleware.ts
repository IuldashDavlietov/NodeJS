import type { RequestHandler } from "express";
import type { HydratedDocument, Model, QueryFilter, SortOrder } from "mongoose";
import { env } from "../configs/env";
import type { ListDetails, ModelPopulate } from "../types/api";

type QueryObject = Record<string, unknown>;

const toQueryObject = (value: unknown): QueryObject =>
  typeof value === "object" && value !== null && !Array.isArray(value) ? { ...value } : {};

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
  /* FILTERING & SEARCHING & SORTING & PAGINATION */

  //* FILTERING: mutlak esitlik arar
  // URL?filter[fieldName1]=value1&filter[filedName2]=value2
  const filter = toQueryObject(req.query.filter);

  //* SEARCHING: kismi esitlik arar
  // URL?search[fieldName1]=value1&search[filedName2]=value2
  // https://www.mongodb.com/docs/manual/reference/operator/query/regex/
  const search = toQueryObject(req.query.search);
  for (const key in search) search[key] = { $regex: search[key], $options: "i" }; // i: case insensitive

  //* SORTING:
  // URL?sort[fieldName1]=asc&sort[filedName2]=desc
  // asc: A-Z - desc: Z-A
  const sort = toQueryObject(req.query.sort);

  const sortOptions: Record<string, SortOrder> = {};
  for (const key in sort) {
    const order = toSortOrder(sort[key]);
    if (order) sortOptions[key] = order;
  }

  //* PAGINATION:
  // URL?page=3&limit=15&skip=20

  // LIMIT:
  const limitQuery = Number(req.query.limit);
  const limit = limitQuery > 0 ? limitQuery : env.PAGE_SIZE;

  // PAGE:
  const pageQuery = Number(req.query.page);
  const page = pageQuery > 0 ? pageQuery : 1;

  // SKIP
  const skipQuery = Number(req.query.skip);
  const skip = skipQuery > 0 ? skipQuery : (page - 1) * limit;

  /* FILTERING & SEARCHING & SORTING & PAGINATION */

  // Run for output:
  res.getModelList = async <T>(
    Model: Model<T>,
    customFilter: QueryFilter<T> = {},
    populate?: ModelPopulate,
  ): Promise<HydratedDocument<T>[]> => {
    const conditions: QueryFilter<T> = { ...filter, ...search, ...customFilter };
    const query = Model.find(conditions).sort(sortOptions).skip(skip).limit(limit);

    return populate ? await query.populate([populate].flat()) : await query;
  };

  // Details:
  res.getModelListDetails = async <T>(
    Model: Model<T>,
    customFilter: QueryFilter<T> = {},
  ): Promise<ListDetails> => {
    const conditions: QueryFilter<T> = { ...filter, ...search, ...customFilter };
    const totalRecords = await Model.countDocuments(conditions);
    const total = Math.ceil(totalRecords / limit);

    return {
      filter,
      search,
      sort,
      skip,
      limit,
      page,
      totalRecords,
      pages:
       totalRecords <= limit
          ? false
          : {
            previous: page > 0 ? page : false,
            current: page + 1,
            next: page + 2 > total ? false : page + 2,
            total,
          },
    };
  };

  next();
};

export default queryHandler;
