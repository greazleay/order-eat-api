import { Customer } from "../entities/Customer";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { ITokens } from "../interfaces/auth.interface";
import { AuthService } from "../services/auth.service";
import { AppError } from "../utils/AppError";

export class AuthController {
    async login(request: Request, response: Response, next: NextFunction) {
        try {
            const { email, password } = request.body;

            // Check if Customer Exists
            const customer = await Customer.findOne({ email });
            if (!customer) throw new AppError("Customer not found", 404);

            // Validate supplied password
            const validPassword = await bcrypt.compare(password, customer.password);
            if (!validPassword) throw new AppError("Invalid password", 401);

            customer.personalKey = await Customer.generatePersonalKey();
            await customer.save();

            // Generate JWT
            const { token, refreshToken } = await AuthService.genTokens(customer, next) as ITokens;
            return { status: 200, message: "Login successful", token, refreshToken };
        } catch (error) {
            return next(error);
        }
    };

    async logout(request: Request, response: Response, next: NextFunction) {
        try {
            const { customer } = request.body;
            customer.personalKey = null;
            await customer.save();
            return { status: 200, message: "Logout successful" };
        } catch (error) {
            return next(error);
        }
    }
}