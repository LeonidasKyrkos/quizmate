import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("varchar", { unique: true })
    email: string;

    @Column("varchar")
    password: string;

    @Column("varchar", { nullable: false, unique: true })
    username: string;

    @CreateDateColumn()
    createdAt;
}
