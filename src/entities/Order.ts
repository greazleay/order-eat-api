import { Entity, Column, ManyToOne } from "typeorm";
import { AbstractEntity } from "./Abstract";
import { Customer } from "./Customer";
import { OrderStatus } from "@src/interfaces/order.interface";

@Entity()
export class Order extends AbstractEntity {

    @Column()
    orderNumber!: number;

    @Column()
    orderDate!: Date;

    @Column("enum", { enum: OrderStatus, default: OrderStatus.PENDING })
    orderStatus!: OrderStatus;

    @Column()
    orderAmount!: number;

    @Column()
    orderDescription!: string;

    @ManyToOne(() => Customer, customer => customer.orders)
    customer!: Customer;
}