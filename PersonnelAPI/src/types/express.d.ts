import type { HydratedDocument, Model } from "mongoose";
import type { ListDetails, ModelPopulate } from "./api";

// Teach TypeScript about what queryHandler adds to res.
declare global {
  namespace Express {
    interface Response {
      getModelList<T>(
        Model: Model<T>,
        populate?: ModelPopulate,
      ): Promise<HydratedDocument<T>[]>;
      getModelListDetails<T>(Model: Model<T>): Promise<ListDetails>;
    }
  }
}