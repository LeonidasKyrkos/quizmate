import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Question } from "src/modules/quiz/models/question.model";

@ObjectType()
export class Quiz {
    @Field(type => ID)
    id: string;

    @Field()
    title: string;

    @Field({ nullable: true })
    description?: string;

    @Field(type => [Question], { nullable: "itemsAndList" })
    questions: Question[];
}
