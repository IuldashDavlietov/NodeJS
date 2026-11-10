import type { HydratedDocument, Model, QueryFilter } from "mongoose";
import type { ListDetails, ModelPopulate } from "./api";
import { PersonnelDocument } from "../models/personnel.model";

// Teach TypeScript about what queryHandler adds to res.
declare global {
  namespace Express {
    interface Request {
      user?: PersonnelDocument | null;
    }

    interface Response {
      getModelList<T>(Model: Model<T>, 
        custumFilters?: QueryFilter,
        populate?: ModelPopulate): Promise<HydratedDocument<T>[]>;
      getModelListDetails<T>(Model: Model<T>, custumFilters?: QueryFilter): Promise<ListDetails>;
    }
  }
}
