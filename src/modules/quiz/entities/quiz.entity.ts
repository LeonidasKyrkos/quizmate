import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class QuizEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 128 })
    title: string;

    @Column({ type: "varchar", length: 300 })
    description: string;

    @Column({ type: "varchar" })
    userId: string;
}
