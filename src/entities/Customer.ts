import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Customer {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    firstName?: string;

    @Column()
    lastName?: string;

    @Column()
    age?: number;

    @Column()
    address?: string;

}
