import { Field, InputType } from "@nestjs/graphql";
import { MaxLength, ArrayMinSize, ArrayMaxSize } from "class-validator";

@InputType()
export class NewQuestionInput {
    @Field()
    @MaxLength(256)
    question: string;

    @Field()
    @MaxLength(64)
    answer: string;

    @Field()
    multipleChoice: boolean;

    @Field(type => [String])
    @ArrayMinSize(2)
    @ArrayMaxSize(3)
    choices: string[];
}
