// src/middlewares/validate.ts
import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
import { ApiResponse } from "@utils/response";

export const validate = (schema: ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log('req.body', req.body);
    const result = schema.safeParse(req.body);

    if (!result.success) {
      // Use the proper validationError formatter
      return ApiResponse.validationError(res, result.error);
    }

    // Attach parsed and typed data to req.body
    req.body = result.data;
    next();
  };
};
