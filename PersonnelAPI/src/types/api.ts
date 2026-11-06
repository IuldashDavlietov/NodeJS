// Shapes shared by controllers and middlewares.

import type { PopulateOptions } from "mongoose";

export type ModelPopulate = string | PopulateOptions | (string | PopulateOptions)[];

export interface IdParams {
  id: string;
}

export interface ListDetails {
  count: number;
  filter: object;
  search: object;
  page: number;
  skip: number;
  limit: number;
  sort: object;
  pages:
    | false
    | {
        previos: number | false;
        current: number;
        next: number | false;
        total: number;
      };
}

export interface ResultResponse<T> {
  error: false;
  result: T;
}

export interface ListResponse<T> extends ResultResponse<T[]> {
  details: ListDetails;
}

export interface MessageResponse {
  error: false;
  message: string;
}

export interface ErrorResponse {
  success: false;
  message: string;
  cause?: unknown;
}