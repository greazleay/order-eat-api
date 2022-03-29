import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import { Customer } from "@entities/Customer";
import { ITokens } from "@interfaces/auth.interface";
import { AuthService } from "@services/auth.service";
import { AppError } from "@errors/AppError";
import { cookieOptions } from "@utils/lib";
import { JwtPayload, verify } from "jsonwebtoken";
import { ENV } from "@utils/validateENV";

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
            customer.personalKey = Customer.generatePersonalKey();
            await customer.save();
            response.clearCookie("jit", cookieOptions);
            return { status: 200, message: "Logout successful" };
        } catch (error) {
            return next(error);
        }
    };

    async refresh_token(request: Request, response: Response, next: NextFunction) {
        try {
            const { jit } = request.signedCookies;
            if (!jit) throw new AppError("No JIT cookie found", 404);

            // Verify refresh token in request
            const REFRESH_TOKEN_PUBLIC_KEY = Buffer.from(ENV.REFRESH_TOKEN_PUBLIC_KEY_BASE64, 'base64').toString('ascii');
            const decoded = verify(jit, REFRESH_TOKEN_PUBLIC_KEY) as JwtPayload;

            // Check if Customer Exists
            const customer = await Customer.findOne({ id: decoded.sub });
            if (!customer) throw new AppError("Customer not found", 404);

            // Generate JWT
            const { token, refreshToken } = await AuthService.genTokens(customer, next) as ITokens;
            return { status: 200, message: "Refresh token successful", token, refreshToken };
        } catch (error) {
            return next(error);
        }
    }
}