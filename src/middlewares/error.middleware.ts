import { NextFunction, Request, Response } from "express";
import configs from "../env";
import { ApiError, ErrorType } from "../libs/error/api-error";
import { ValidationError } from "../libs/error/custom-error";

export const errorMiddleware = (
    _err: Error | any,
    _req: Request,
    _res: Response,
    _next: NextFunction
) => {
    let error = _err;
    if (!error.message) {
        error.message = error.message || "Internal Server Error";
    }
    if (!error?.statusCode) {
        error.statusCode = error.statusCode || 500;
    }

    // Handling mongoose CastError
    if (error.name === "CastError") {
        error = new ApiError(
            ErrorType.BAD_REQUEST,
            400,
            `Resource not found. Invalid:${error.path}`
        );
    }

    // Handling mongoose validation error
    if (error.name === "ValidationError") {
        error = new ValidationError(
            Object.values(error.errors)
                .map((value: any) => value.message)
                .join(", ")
        );
    }

    // Wrong Mongodb Id error
    if (error.name === "CastError") {
        error = new ValidationError(
            `Resource not found. Invalid: ${error.path}`
        );
    }

    // Mongoose duplicate key error
    if (error.code === 11000) {
        error = new ValidationError(
            `Duplicate ${Object.keys(error.keyValue)} Entered`
        );
    }

    console.log(error); // Log the error

    _res.status(error.statusCode).json({
        success: false,
        message: error.message,
        error: error,
        stack: configs.NODE_ENV === "development" ? error.stack : null,
    });
};
