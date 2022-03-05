import { Customer } from "../entities/Customer";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { ITokens } from "../interfaces/auth.interface";

export class AuthController {
    async login(request: Request, response: Response, next: NextFunction) {
        const { email, password } = request.body;

        // Check if Customer Exists
        const customer = await Customer.findOne({ email });
        if (!customer) return { status: 404, message: "Customer not found" };

        // Validate supplied password
        const validPassword = await bcrypt.compare(password, customer.password);
        if (!validPassword) return { status: 401, message: "Invalid password" };

        // Generate JWT
        const { token, refreshToken } = await Customer.generateJWT(customer, next) as ITokens;
        return { status: 200, message: "Login successful", token, refreshToken };
    }
}