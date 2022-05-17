import { Entity, Column, OneToOne } from "typeorm";
import { AbstractEntity } from "./Abstract";
import { Customer } from "@entities/Customer";

@Entity()
export class Wallet extends AbstractEntity {

    @Column({ type: "int", nullable: true })
    walletNumber!: number;

    @Column({ type: "int", nullable: true })
    balance!: number;
    
    @OneToOne(() => Customer, customer => customer.wallet)
    customer!: Customer;

    static updateBalance(account: Wallet, amount: number) {
        account.balance += amount;
    };
}