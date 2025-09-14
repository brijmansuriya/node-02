// src/utils/response.ts
import { Response } from "express";
import { ZodError } from "zod";

export class ApiResponse {
  static success(res: Response, data: any = {}, message = "Success", statusCode = 200) {
    return res.status(statusCode).json({
      status: true,
      message,
      data,
    });
  }

  static error(res: Response, message = "Something went wrong", errors: any = null, statusCode = 500) {
    return res.status(statusCode).json({
      status: false,
      message,
      errors : errors,
    });
  }

 
  static validationError(res: Response, zodError: ZodError, message = "Validation failed") {
    const formattedErrors: Record<string, string> = {};

    zodError.issues.forEach((err) => {
      const field = err.path[0] as string || "_global";
      // Only keep the first message per field
      if (!formattedErrors[field]) {
        formattedErrors[field] = err.message;
      }
    });

    return res.status(400).json({
      status: false,
      message,
      errors: formattedErrors,
    });
  }

  static unauthorized(res: Response, message = "Unauthorized") {
    return res.status(401).json({
      status: false,
      message,
      errors: null,
    });
  }
}
