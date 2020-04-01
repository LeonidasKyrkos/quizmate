import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Question {
    @Field(type => ID)
    id: string;

    @Field()
    question: string;

    @Field()
    answer: string;

    @Field()
    multipleChoice: boolean;

    @Field(type => [String], { nullable: true })
    choices: string[];
}
