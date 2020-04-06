import { Field, InputType } from "@nestjs/graphql";
import { IsEmail } from "class-validator";

@InputType()
export class UserDto {
    @Field()
    @IsEmail()
    email: string;

    @Field()
    id: string;
}
