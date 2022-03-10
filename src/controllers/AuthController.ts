import { Customer } from "../entities/Customer";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { ITokens } from "../interfaces/auth.interface";
import { AuthService } from "../services/auth.service";

export class AuthController {
    async login(request: Request, response: Response, next: NextFunction) {
        const { email, password } = request.body;

        // Check if Customer Exists
        const customer = await Customer.findOne({ email });
        if (!customer) return { status: 404, message: "Customer not found" };

        // Validate supplied password
        const validPassword = await bcrypt.compare(password, customer.password);
        if (!validPassword) return { status: 401, message: "Invalid password" };

        customer.personalKey = await Customer.generatePersonalKey();
        await customer.save();

        // Generate JWT
        const { token, refreshToken } = await AuthService.genTokens(customer, next) as ITokens;
        return { status: 200, message: "Login successful", token, refreshToken };
    };

    async logout(request: Request, response: Response, next: NextFunction) {
        const { token, refreshToken } = request.body;

        // Check if token is valid
        // const isValid = await Customer.verifyJWT(token, next);
        // if (!isValid) return { status: 401, message: "Invalid token" };

        // // Revoke token
        // const revoked = await Customer.revokeJWT(token, next);
        // if (!revoked) return { status: 500, message: "Error revoking token" };

        // // Revoke refresh token
        // const revokedRefresh = await Customer.revokeJWT(refreshToken, next);
        // if (!revokedRefresh) return { status: 500, message: "Error revoking refresh token" };

        return { status: 200, message: "Logout successful" };
    }
}