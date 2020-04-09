import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, Length, MaxLength } from "class-validator";

@InputType()
export class NewQuestionInput {
    @Field()
    @MaxLength(256)
    question: string;

    @Field()
    quiz: string;
}
