import { Request, Response, NextFunction } from "express";
import { Customer } from "../entities/Customer";
import { AppError } from "../utils/AppError";
import { JsonWebTokenError, JwtPayload, sign, verify } from "jsonwebtoken";
import { ENV } from "../utils/validateENV";
import { ICustomer } from "../interfaces/customer.interface";
import { ITokens } from "../interfaces/auth.interface";

export class AuthService {
    public static async authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.headers.authorization || req.headers.authorization.split(" ")[0] !== "Bearer") {
                throw new AppError("Authorization header is not valid", 401);
            }
            const token = req.headers.authorization.split(" ")[1];

            const PUBLIC_KEY = Buffer.from(ENV.ACCESS_TOKEN_PUBLIC_KEY_BASE64, 'base64').toString('ascii');
            const decoded: any = verify(token, PUBLIC_KEY);

            const customer = await Customer.findOne({ where: { id: decoded.sub } });
            if (!customer) throw new AppError("Customer not found", 404);

            if (customer.personalKey !== decoded.personalKey) throw new AppError("Invalid personal key", 401);
            req.body.customer = customer;

            next();
        } catch (error) {
            if (error instanceof JsonWebTokenError) {
                return next(new AppError(error.message, 401));
            }
            return next(error)
        }
    };

    public static async genTokens(customer: ICustomer, next: NextFunction): Promise<ITokens | void> {
        try {
            const payload = {
                aud: "http://localhost:3000",
                iss: "http://localhost:3000",
                sub: customer.id,
                name: customer.firstName + " " + customer.lastName,
                email: customer.email,
                age: customer.age,
                address: customer.address,
                personalKey: customer.personalKey,
            };

            // Process Access token
            const ACCESS_TOKEN_PRIVATE_KEY = Buffer.from(ENV.ACCESS_TOKEN_PRIVATE_KEY_BASE64, 'base64').toString('ascii');
            const token: string = sign(payload, { key: ACCESS_TOKEN_PRIVATE_KEY, passphrase: ENV.ACCESS_TOKEN_SECRET }, { algorithm: 'RS256', expiresIn: '1h' });

            // Process Refresh token
            const REFRESH_TOKEN_PRIVATE_KEY = Buffer.from(ENV.REFRESH_TOKEN_PRIVATE_KEY_BASE64, 'base64').toString('ascii');
            const refreshToken: string = sign(payload, { key: REFRESH_TOKEN_PRIVATE_KEY, passphrase: ENV.REFRESH_TOKEN_SECRET }, { algorithm: 'RS256', expiresIn: '7d' });

            return { token, refreshToken };
        } catch (error) {
            next(error);
        }
    };

    public static async extractTokenFromHeader(req: Request, res: Response, next: NextFunction): Promise<JwtPayload | void> {
        try {
            if (!req.headers.authorization || req.headers.authorization.split(" ")[0] !== "Bearer") {
                throw new AppError("Authorization header is not valid", 401);
            }
            const token = verify(req.headers.authorization.split(" ")[1], ENV.ACCESS_TOKEN_PUBLIC_KEY_BASE64) as JwtPayload;
            req.body.token = token;
            return token
        } catch (error) {
            next(error);
        }
    }
}