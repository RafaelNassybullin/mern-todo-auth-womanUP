import ApiError from "../exception/apiErrors";
import { Response, Request, NextFunction } from "express";

export default function errorMiddleware(err: ApiError, _: Request, res: Response, __: NextFunction) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: "something went wrong" });
};

