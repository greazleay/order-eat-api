import { Entity, Column, JoinColumn, OneToOne, OneToMany } from "typeorm";
import bcrypt from "bcrypt";
import { AbstractEntity } from "./Abstract";
import { randomBytes } from "crypto";
import { Wallet } from "@src/entities/Wallet";
import { Order } from "./Order";
import { Role } from "@src/interfaces/customer.interface";

@Entity()
export class Customer extends AbstractEntity {

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

    @Column({ nullable: true })
    personalKey!: string;

    @Column({ default: true, nullable: true })
    isActive!: boolean;

    @Column({ type: "enum", enum: Role, default: Role.USER })
    role!: Role;

    @OneToOne(() => Wallet, wallet => wallet.customer)
    @JoinColumn()
    wallet!: Wallet;

    @OneToMany(() => Order, order => order.customer)
    orders!: Order[];

    static hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    static async generatePersonalKey() {
        return randomBytes(16).toString('hex');
    };
}