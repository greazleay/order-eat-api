import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { BaseEntity } from "typeorm/repository/BaseEntity";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { ICustomer } from "../interfaces/customer.interface";
import { ITokens } from "../interfaces/auth.interface";
import { NextFunction } from "express";
import { ENV } from "../utils/validateENV"


@Entity()
export class Customer extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    age!: number;

    @Column()
    address!: string;

    @Column()
    @CreateDateColumn()
    createdAt!: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt!: Date;

    @Column()
    @VersionColumn()
    version!: number;

    static hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    static async generateJWT(customer: ICustomer, next: NextFunction): Promise<ITokens | void> {
        try {
            const payload = {
                aud: "http://localhost:3000",
                iss: "http://localhost:3000",
                sub: customer.id,
                name: customer.firstName + " " + customer.lastName,
                email: customer.email,
                age: customer.age,
                address: customer.address,
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
}