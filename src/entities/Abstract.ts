import { BaseEntity, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity()
export class AbstractEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @VersionColumn()
    version!: number;
}


