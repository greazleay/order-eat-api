import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import createHttpError from "http-errors";
import express from "express";
import morgan from "morgan";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import { Routes } from "../src/routes/routes";

// create express app
const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());

// register express routes from defined application routes
Routes.forEach(route => {
    (app as any)[route.method](route.route,
        ...route.validation,
        async (req: Request, res: Response, next: Function) => {

            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return next(createHttpError(422, errors.array()));
                }
                const result = await (new (route.controller as any))[route.action](req, res, next);
                res.json(result);
            } catch (error) {
                next(error);
            }
        });
});

// Handle 404 errors
app.use((req: Request, res: Response, next) => {
    next(createHttpError(404, 'The requested resource was not found on this server!!!'))
});

// Error handler
app.use((err: { status: number; message: any; toString: () => any; }, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({ error: err.message || err.toString() })
})

export default app;
