import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { ApiError } from "../utils/ApiError";

export const validate = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const { error } = schema.validate(req.body);

        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join(", ");
            next(new ApiError(400, errorMessage));
            return;
        }

        next();
    };
};
