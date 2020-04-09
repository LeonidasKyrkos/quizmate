import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Question {
    @Field(type => ID)
    id: string;

    @Field()
    question: string;

    @Field(type => ID)
    quiz: string;

    @Field()
    multipleChoice: boolean;
}
