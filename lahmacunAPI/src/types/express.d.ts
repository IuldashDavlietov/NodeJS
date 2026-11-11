import type { HydratedDocument, Model, QueryFilter } from "mongoose";
import type { ListDetails, ModelPopulate } from "./api";

// Teach TypeScript about what our middlewares add to req and res.
declare global {
  namespace Express {
    interface Request {
      // Change this to UserDocument after the user model is written.
      user?: { isActive: boolean } | null;
    }

    interface Response {
      getModelList<T>(
        Model: Model<T>,
        customFilter?: QueryFilter<T>,
        populate?: ModelPopulate,
      ): Promise<HydratedDocument<T>[]>;
      getModelListDetails<T>(Model: Model<T>, customFilter?: QueryFilter<T>): Promise<ListDetails>;
    }
  }
}
