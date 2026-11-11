// Shapes shared by controllers and middlewares.

import type { PopulateOptions } from "mongoose";

export type ModelPopulate = string | PopulateOptions | (string | PopulateOptions)[];

export interface IdParams {
  id: string;
}

export interface ListDetails {
  filter: object;
  search: object;
  sort: object;
  skip: number;
  limit: number;
  page: number;
  totalRecords: number;
  pages:
    | false
    | {
        previous: number | false;
        current: number;
        next: number | false;
        total: number;
      };
}

export interface ResultResponse<T> {
  success: true;
  result: T;
}

export interface ListResponse<T> extends ResultResponse<T[]> {
  details: ListDetails;
}

// export interface MessageResponse {
//   success: true;
//   message: string;
// }

export interface ErrorResponse {
  success: false;
  message: string;
  cause?: unknown;
}