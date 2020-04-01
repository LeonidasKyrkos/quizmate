import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, Length, MaxLength } from "class-validator";

import { NewQuestionInput } from "./new-question-input";

@InputType()
export class NewQuizInput {
    @Field()
    @MaxLength(128)
    title: string;

    @Field({ nullable: true })
    @IsOptional()
    @Length(30, 255)
    description?: string;

    @Field(type => [NewQuestionInput])
    @IsOptional()
    questions: NewQuestionInput[];
}
