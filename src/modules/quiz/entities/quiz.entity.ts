import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Question } from "./question.entity";
import { ObjectType, Field, ID } from "@nestjs/graphql";

@Entity()
@ObjectType()
export class Quiz {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field(() => String)
    @Column({ type: "varchar", length: 128 })
    title: string;

    @Field(() => String)
    @Column({ type: "varchar", length: 300 })
    description: string;

    @Field(() => String)
    @Column({ type: "varchar" })
    userId: string;

    @Field(() => [Question])
    @OneToMany(
        type => Question,
        question => question.quiz
    )
    questions: Question[];
}
