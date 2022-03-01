import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { BaseEntity } from "typeorm/repository/BaseEntity";
import bcrypt from "bcrypt";


@Entity()
export class Customer extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

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
    
    static comparePassword(storedPassword: string, suppliedPassword: string): Promise<boolean> {
        return bcrypt.compare(suppliedPassword, storedPassword);
    }

    static hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}