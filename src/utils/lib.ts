import { CookieOptions } from "express";

export const cookieOptions: CookieOptions = {
    path: '/v1/auth/refresh_token',
    httpOnly: true,
    maxAge: 604800000,
    signed: true,
    sameSite: 'none',
    secure: true,
};