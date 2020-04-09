import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Quiz } from "./quiz.entity";
import { ObjectType, Field, ID } from "@nestjs/graphql";

@Entity()
@ObjectType()
export class Question {
    @Field(type => ID)
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field(type => String)
    @Column({ type: "varchar", nullable: false, unique: true })
    question: string;

    @ManyToOne(
        type => Quiz,
        quiz => quiz.questions
    )
    quiz: Quiz;

    @Field(type => Boolean)
    @Column({ type: "boolean", default: false })
    multipleChoice: boolean;
}
