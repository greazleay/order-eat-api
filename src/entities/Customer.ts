import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, VersionColumn, OneToMany } from "typeorm";
import { BaseEntity } from "typeorm/repository/BaseEntity";
import bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import { Account } from "@entities/Account";

enum Role {
    USER = "user",
    ADMIN = "admin"
}


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

    @Column({ nullable: true })
    personalKey!: string;

    @Column({ default: true, nullable: true })
    isActive!: boolean;

    @Column({ type: "enum", enum: Role, default: Role.USER })
    role!: Role;

    @OneToMany(() => Account, account => account.customer)
    accounts!: Account[];

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

    static async generatePersonalKey() {
        return randomBytes(16).toString('hex');
    };
}