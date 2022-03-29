import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, VersionColumn, ManyToOne } from "typeorm";
import { Customer } from "@entities/Customer";

type AccountType = "current" | "savings";

@Entity()
export class Account {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @ManyToOne(() => Customer, customer => customer.accounts)
    customer!: Customer;

    @Column({ type: "int", nullable: true })
    accountNumber!: number;

    @Column({ type: "enum", enum: ["current", "savings"], default: "current" })
    type!: AccountType;

    @Column({ type: "int", nullable: true })
    balance!: number;

    @Column()
    @CreateDateColumn()
    createdAt!: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt!: Date;

    @Column()
    @VersionColumn()
    version!: number;

    static updateBalance(account: Account, amount: number) {
        account.balance += amount;
    };
}