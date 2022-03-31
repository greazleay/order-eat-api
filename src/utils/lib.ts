import { CookieOptions } from "express";

export const cookieOptions: CookieOptions = {
    path: '/customers/refresh_token',
    httpOnly: true,
    maxAge: 604800000,
    signed: true,
    sameSite: 'none',
    secure: true,
};