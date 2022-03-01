import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import createHttpError, { HttpError } from "http-errors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import { Routes } from "../src/routes/routes";

// create express app
const app = express();

const whitelist = ['http://localhost:3000'];
const corsOptions: CorsOptions = {
    credentials: true,
    methods: ['GET', 'DELETE', 'OPTIONS', 'POST', 'PUT'],
    origin: (requestOrigin: string | undefined, callback) => {
        if (whitelist.indexOf(requestOrigin as string) !== -1 || !requestOrigin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
};

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(helmet());
app.use(compression());

// register express routes from defined application routes
Routes.forEach(route => {
    (app as any)[route.method](route.route,
        ...route.validation, ...route.middlewares,
        
        async (req: Request, res: Response, next: Function) => {

            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
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
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).json({ error: err.message || err.toString() })
})

export default app;
