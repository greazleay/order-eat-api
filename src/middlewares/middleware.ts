import { Request, NextFunction, Response } from "express";
import { Customer } from "./../entities/Customer";
import { ApplicationError } from "../utils/CustomAppError";

export const authorizeRequest = async (request: Request, res: Response, next: NextFunction) => {
    try {
        if (!request.headers.authorization || request.headers.authorization.split(" ")[0] !== "Bearer") {
            throw new ApplicationError("Authorization header is not valid", 401);
        }
        const token = request.headers.authorization.split(" ")[1];
        const isValid = await Customer.verifyJWT(token, next);
        if (!isValid) throw new ApplicationError("Invalid token", 401);
        next();
    } catch (error) {
        return next(error)
    }
}