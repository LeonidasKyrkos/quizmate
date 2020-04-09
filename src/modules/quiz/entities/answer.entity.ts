import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
} from "typeorm";
import { Question } from "./question.entity";

@Entity()
export class Answer {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToOne(type => Question)
    @JoinColumn()
    question: Question;

    @Column({ type: "boolean", default: true })
    true: boolean;
}
