import { Request, Response, NextFunction } from "express";

export class AuthController {
    async login(request: Request, response: Response, next: NextFunction) {
        return response.json({
            message: "Login successful"
        });
    }

    async logout(request: Request, response: Response, next: NextFunction) {
        return response.json({
            message: "Logout successful"
        });
    }
}